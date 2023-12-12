import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Genre} from "./genre.model";
import {CreateGenreDto} from "./dto/create-genre.dto";
import {UpdateGenreDto} from "./dto/update-genre.dto";

@Injectable()
export class GenreService {
    constructor(@InjectModel(Genre) private genreRepository: typeof Genre) {}
    async createGenre(dto: CreateGenreDto){
       try {
           const genre = await this.genreRepository.create(dto)
           return genre
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
    async getByName(name: string){
        const genre = await this.genreRepository.findAll({where: {name}})
        if(!genre){
            throw new HttpException("Genre not found", HttpStatus.NOT_FOUND)
        }
        return genre
    }
    async getById(id: number){
        const genre = await this.genreRepository.findByPk(id)
        if(!genre){
            throw new HttpException("Genre not found", HttpStatus.NOT_FOUND)
        }
        return genre
    }
    async update({id, description, name}: UpdateGenreDto) {
        const genre = await this.getById(id)
        await genre.update({description, name})
        return genre
    }
    async delete(id: number){
        let genre = await this.getById(id)
        await genre.destroy({force: true})
        return HttpStatus.OK
    }

    async getAll(){
        let genres = await this.genreRepository.findAll()
        return genres
    }
}
