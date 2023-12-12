import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Favorites} from "./models/favorites.model";
import {TitleService} from "../title/title.service";
import {CharacterService} from "../character/character.service";

@Injectable()
export class FavoritesService {
   constructor(
       @InjectModel(Favorites) private favoriteRepository: typeof Favorites,
       private titleService: TitleService,
       private characterService: CharacterService,

   ) {}
    async create(userId: number){
       try {
           const  favorites = await this.favoriteRepository.create({userId: userId})
           return favorites
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }
    async getByUserId(userId: number){
        const favorite = await this.favoriteRepository.findOne({ where: {userId}});
        if(!favorite){
            throw new HttpException("favorites with this user id not found", HttpStatus.NOT_FOUND)
        }
        return favorite
    }
    async addFavoriteTitle(userId:number, titleId:number){
        const favorite = await this.getByUserId(userId)
        const title = await this.titleService.getById(titleId)
        await favorite.$add("titles", title.id)
        return favorite
    }

    async addFavoriteCharacter(userId:number, characterId:number){
        const favorite = await this.getByUserId(userId)
        const title = await this.characterService.getById(characterId)
        await favorite.$add("characters", title.id)
        return favorite
    }

    async removeFavoriteTitle(userId:number, titleId:number){
        const favorite = await this.getByUserId(userId)
        if(!await favorite.$has("titles", titleId)){
            throw new HttpException("Title with this id not in favorites", HttpStatus.BAD_REQUEST)
        }
        await favorite.$remove("titles", titleId)
        return favorite
    }
    async removeFavoriteCharacter(userId:number, characterId:number){
        const favorite = await this.getByUserId(userId)
        if(!await favorite.$has("titles", characterId)){
            throw new HttpException("Character with this id not in favorites", HttpStatus.BAD_REQUEST)
        }
        await favorite.$remove("characters", characterId)
        return favorite
    }
}
