import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user-dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {EmailsService} from "../emails/emails.service";
import {RolesService} from "../roles/roles.service";
import {FilesService} from "../files/files.service";
import * as uuid from "uuid"
import {Op} from "sequelize";
import {WatchListService} from "../watch-list/watch-list.service";
import {FavoritesService} from "../favorites/favorites.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private emailService: EmailsService, private roleService: RolesService,
                private fileService: FilesService, private watchListService: WatchListService,
                private favoritesService: FavoritesService,
                private configService: ConfigService
    ){}
    async activate(activationLink: string) {
        const user = await this.userRepository.findOne({where: {activationLink: activationLink}})
        if (!user) {
            return new HttpException("User not found", HttpStatus.FORBIDDEN)
        }
        user.isActivated = true
        await user.save()
    }

   async getById(id: number) {
       const user = await this.userRepository.findByPk(id, {include: {all: true}})
       if(!user){
           throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
       }
       return user
    }

    async getAll(limit:number | undefined, page:number | undefined) {
        try {
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            const  users = await this.userRepository.findAndCountAll({limit: limit, offset: offset})
            return users
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        if(!user){
            throw new HttpException(`user with email ${email} not found`, HttpStatus.NOT_FOUND)
        }
        return user
    }

    async createUser(dto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({where: {[Op.or]: [{ nickname: dto.nickname}, { email: dto.email}]}})
        if(candidate){
            throw new HttpException("User with this email or nickname already exists", HttpStatus.BAD_REQUEST)
        }
        const role = await this.roleService.getRoleByValue("USER")
        if(!role){
            throw new HttpException("role USER not found", HttpStatus.NOT_FOUND)
        }
        try {
            const activationLink = await uuid.v4()
            const user = await this.userRepository.create({...dto, activationLink: activationLink})
            await this.emailService.senActivationMail(dto.email, `${this.configService.get("api_url")}/user/activation/${activationLink}`, dto.nickname)
            await user.$set('roles', [role.id])
            user.roles = [role]
            await this.watchListService.create(user.id)
            await this.favoritesService.create(user.id)
            return user
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async uploadAvatar(userId: number, image) {
        try {
            const user = await this.getById(userId)
            if(!user){
                throw new HttpException("User not found", HttpStatus.NOT_FOUND)
            }
            if(user.avatar !== "no-avatar.png"){
                await this.fileService.deleteFile(user.avatar)
            }
            const fileName =  this.fileService.uploadImage(image)
            user.avatar = fileName
            await user.save()
            return {fileName: fileName}
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(id: number) {
        let user = await this.getById(id)
        await user.destroy()
        return HttpStatus.OK
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if(user && role){
            await user.$add("role", role.id)
            return dto
        }
        throw new HttpException("user or role not found", HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
       try {
           const user = await this.getById(dto.userId)
           user.banned = true
           user.bandReason = dto.banReason
           await user.save()
           return user
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
}
