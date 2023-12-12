import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Rating} from "./rating.model";
import {WatchListItemService} from "../watch-list-item/watch-list-item.service";
import {CreateRatingDto} from "./dto/create-rating.dto";

@Injectable()
export class RatingService {
    constructor(
        @InjectModel(Rating) private ratingRepository: typeof Rating,
        private watchListItemService: WatchListItemService,
    ) {}
    async createRating({userId, rating, titleId, watchListId}: CreateRatingDto){
       try {
           const existingRating = await this.ratingRepository.findOne({where: {userId, titleId}});
           let watchListItem = await this.watchListItemService.getOneByTitleId(userId,titleId)
           if(!watchListItem){
               watchListItem =  await this.watchListItemService.create({watchListId, titleId, status: "completed"})
           }
           if(existingRating){
               existingRating.rating = rating;
               await existingRating.save();
               return existingRating;
           }
           return this.ratingRepository.create({ userId, titleId, rating, watchlistItemId: watchListItem.id});
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async getAll(titleId: number) {
        const scores = await this.ratingRepository.findAll({where: {titleId}})
        if(!scores){
            throw new HttpException("scores with this title not found", HttpStatus.NOT_FOUND)
        }
        return scores
    }
}
