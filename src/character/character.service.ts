import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCharacterDto} from "./dto/create-character.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Character} from "./character.model";
import {FilesService} from "../files/files.service";
import {UpdateCharacterDto} from "./dto/update-character-dto";

@Injectable()
export class CharacterService {
    constructor(@InjectModel(Character) private characterRepository: typeof Character, private fileService: FilesService) {}
    async createCharacter(dto: CreateCharacterDto) {
           const character = await this.characterRepository.create(dto)
           return character
    }

    async getByName(name: string) {
            const character = await this.characterRepository.findOne({where: {name}})
            if(!character){
                throw  new HttpException("character with this name not found", HttpStatus.NOT_FOUND)
            }
            return character
    }

    async getById(id: number) {
            const character = await this.characterRepository.findByPk(id)
            if(!character){
                throw  new HttpException("Character not found", HttpStatus.NOT_FOUND)
            }
            return character
    }
    async update({id, description, name, otherNames}: UpdateCharacterDto) {
        const character = await this.getById(id)
        await character.update({description, name, otherNames})
        return character
    }

    async uploadPicture(id: number, image) {
        const character = await this.getById(id)
        if(character.picture !== "no-img.png"){
            await this.fileService.deleteFile(character.picture)
        }
        const fileName =  this.fileService.uploadImage(image)
        character.picture = fileName
        await character.reload()
        return character
    }
    async delete(id: number){
        let character = await this.getById(id)
        await character.destroy({force: true})
        return HttpStatus.OK
    }

    async getAll(limit: number | undefined, page: number | undefined) {
       try {
           page = page || 1
           limit = limit || 9
           let offset = page * limit - limit
           const  characters = await this.characterRepository.findAndCountAll({limit: limit, offset: offset})
           return characters
       }
       catch (e) {
           throw  new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
}
