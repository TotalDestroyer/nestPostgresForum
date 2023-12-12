import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Title} from "./title.model";
import {FilesService} from "../files/files.service";
import {Op} from "sequelize";
import {Genre} from "../genre/genre.model";
import {Type} from "../type/type.model";
import {TitleCreateDto} from "./dto/title-create-dto";
import {SearchTitleDto} from "./dto/search-title.dto"
@Injectable()
export class TitleService {
    constructor(@InjectModel(Title) private titleRepository: typeof Title, private fileService: FilesService){}
   async create(dto: TitleCreateDto) {
        try {
            let title =  await this.titleRepository.create(dto)
            dto.characters?.map(character => title.$set("characters", character))
            dto.genres?.map(genre => {title.$set("genres", genre)})
            dto.types?.map(type => title.$set("types", type))
            return title
        }
        catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getById(id: number){
        let title = await this.titleRepository.findByPk(id)
        if(!title){
            throw new HttpException("title with this id not found", HttpStatus.NOT_FOUND)
        }
        return title
    }
    async getAll(limit: number | undefined, page: number | undefined){
       try {
           page = page || 1
           limit = limit || 9
           let offset = page * limit - limit
           let titles = await this.titleRepository.findAll({limit: limit, offset:offset})
           return titles
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
    async uploadPoster(title: Title, poster){
      try {
          if(title.poster !== "no-poster.png"){
              await this.fileService.deleteFile(title.poster)
          }
          const fileName = this.fileService.uploadImage(poster)
          title.poster = fileName
          return fileName
      }
      catch (e) {
          throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async changePoster(titleId: number, poster) {
        console.log(titleId)
        const title = await this.getById(titleId)
        await this.uploadPoster(title, poster)
        return title
    }
    async delete(id: number){
        try {
            let title = await this.getById(id)
            await title.destroy({force: true})
            return HttpStatus.OK
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async search(dto: SearchTitleDto) {
        let {name, limit, types, genres} = dto
        let titles;
        limit = limit | 10
        if(name && types && genres){
            titles = await this.titleRepository.findAll({
                where: {name: {[Op.like]: `%${name}%`}},
                include: [
                    {model: Genre, where: {id: {[Op.in]: genres}}},
                    {model: Type, where: {id: {[Op.in]: types}}}
                ]
            })
        }
        if (!genres && !types && name) {
            titles = await this.titleRepository.findAll({limit: limit, where: {name: {[Op.like]: `%${name}%`}}})
        }
        if(genres && !types && name){
            titles = await this.titleRepository.findAll({
                where: {name: {[Op.like]: `%${name}%`}},
                include: [{model: Genre, where: {id: {[Op.in]: genres}}}]
            })
        }
        if(!genres && types && name){
            titles = await this.titleRepository.findAll({
                where: {name: {[Op.like]: `%${name}%`}},
                include: [{model: Type, where: {id: {[Op.in]: types}}}]
            })
        }
        if(genres && !types && !name){
            titles = await this.titleRepository.findAll({
                limit: limit,
                include: [{model: Genre, where: {id: {[Op.in]: genres}}}]})
        }
        if(!genres && types && !name){
            titles = await this.titleRepository.findAll({
                limit: limit,
                include: [{model: Type, where: {id: {[Op.in]: types}}}]})
        }
        return titles
    }

}
