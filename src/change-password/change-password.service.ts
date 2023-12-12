import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {EmailsService} from "../emails/emails.service";
import {User} from "../user/user.model";
import {InjectModel} from "@nestjs/sequelize";
import * as uuid from "uuid"
import * as bcrypt from "bcryptjs"
import {ConfigService} from "@nestjs/config";
import {response} from "express";
import {ChangeRequestDto} from "./dto/change-request.dto";

@Injectable()
export class ChangePasswordService {
    constructor(private userService: UserService, private mailService: EmailsService,
                @InjectModel(User) private userRepository: typeof User,
                private configService: ConfigService
    ) {
    }

    async requestChangePassword(dto: ChangeRequestDto) {
        let user = await this.userRepository.findByPk(dto.userId)
        if(!user){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND)
        }
        const token = uuid.v4()
        const hashPassword = await bcrypt.hash(dto.newPassword, 5)
        user.pendingPassword = hashPassword
        user.changePasswordToken = token
        await user.save()
        await this.mailService.sendChangePasswordMail(user.email, `${this.configService.get("api_url")}/change-password/confirm/${token}`, user.nickname)
        return HttpStatus.OK
    }

    async confirmPasswordChange(changePasswordToken: string) {
        let user = await this.userRepository.findOne({where: {changePasswordToken}})
        if(!user){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND, )
        }
        await user.update({password: user.pendingPassword, pendingPassword: null, changePasswordToken: null})
    }
}
