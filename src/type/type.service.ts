import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Type} from "./type.model";
import {CreateTypeDto} from "./dto/create-type.dto";
import {UpdateTypeDto} from "./dto/update-type.dto";

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private typeRepository: typeof Type) {}
    async createType(dto: CreateTypeDto){
       try {
           const type = await this.typeRepository.create(dto)
           return type
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
    async getByName(name: string){
        const type = await this.typeRepository.findOne({where: {name}})
        if(!type){
            throw new HttpException(`type with name ${name} not found`, HttpStatus.NOT_FOUND)
        }
        return type
    }
    async getById(id: number){
        const type = await this.typeRepository.findByPk(id)
        if(!type){
            throw new HttpException(`type with id ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return type
    }

    async update({id, description, name}: UpdateTypeDto) {
       try {
           const type = await this.getById(id)
           await type.update({description, name})
           return type
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
    async delete(id:number){
      try {
          let type = await this.getById(id)
          await type.destroy({force: true})
          return HttpStatus.OK
      }
      catch (e) {
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    async getAll(){
        let types = await this.typeRepository.findAll()
        return types
    }

}
