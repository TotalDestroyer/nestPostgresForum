import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {WatchListItem} from "./watch-list-item.model";
import {WatchListItemDto} from "./dto/watch-list-item.dto";
import {ChangeStatusDto} from "./dto/change-status.dto";
import {UpdateEpisodesDto} from "./dto/update-episodes.dto";
import {WatchList} from "../watch-list/watch-list.model";

@Injectable()
export class WatchListItemService {
    constructor(
        @InjectModel(WatchListItem) private WatchListItemRepository: typeof WatchListItem,
        @InjectModel(WatchList) private WatchListRepository: typeof WatchList,
    ) {}
    async create(dto: WatchListItemDto) {
       try {
           let item = await this.WatchListItemRepository.create({...dto})
           return item
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async findOne(id: number){
        let item = await this.WatchListItemRepository.findByPk(id)
        if(!item){
            throw new HttpException(`watch list item with ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return item
    }

    async incrementEpisodes({id, amount}: UpdateEpisodesDto) {
       try {
           let item = await this.findOne(id)
           await item.increment("episodesWatched", {by: amount})
           return item
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async decrementEpisodes({id, amount}: UpdateEpisodesDto) {
        let item = await this.findOne(id)
        await item.increment("episodesWatched", {by: amount})
        return item
    }


    async remove(id: number) {
        let item = await this.findOne(id)
        await item.destroy({force: true})
        return HttpStatus.OK
    }

    async changeStatus(dto: ChangeStatusDto) {
        let item = await this.findOne(dto.id)
        await item.update({status: dto.newStatus})
        return item
    }
    async getOneByTitleId(userId: number, titleId:number){
      try {
          let userWatchList = await this.WatchListRepository.findOne({where: {userId}})
          let item = await this.WatchListItemRepository.findOne(
              {where: {watchListId: userWatchList.id, titleId:titleId}}
          )
          return item
      }
      catch (e) {
          throw  new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
}
