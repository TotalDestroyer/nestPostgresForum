import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {WatchList} from "./watch-list.model";
import {Title} from "../title/title.model";
import {WatchListItem} from "../watch-list-item/watch-list-item.model";
import {Rating} from "../rating/rating.model";


@Injectable()
export class WatchListService {
    constructor(@InjectModel(WatchList) private watchListRepository: typeof WatchList) {}

    async create(userId: number){
        try {
            let watchList = await this.watchListRepository.create({userId: userId})
            return watchList
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getByUserId(userId: number){
        let watchList = await this.watchListRepository.findOne({where: {userId},
            include: [ {model: WatchListItem, include: [{model: Title, attributes: ["name", "poster", "id"]}, {model: Rating}]}
        ]})
        if(!watchList){
            throw new HttpException(`watch list with user id ${userId} not found`, HttpStatus.NOT_FOUND)
        }
        return watchList
    }
}
