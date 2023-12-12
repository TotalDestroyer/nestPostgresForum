import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Comments} from "./models/comments.model";
import {Like} from "./models/like.model";
import {Dislike} from "./models/dislike.model";
import {literal} from "sequelize";
import {GetCommentsDto} from "./dto/get-comments.dto";

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comments) private commentsRepository: typeof Comments,
        @InjectModel(Like) private likeRepository: typeof Like,
        @InjectModel(Dislike) private dislikeRepository: typeof Dislike
    ) {}
    async create(dto: CreateCommentDto) {
       try {
           let comment = await this.commentsRepository.create({...dto})
           return comment
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async getOne(commentId: number){
        const comment = await this.commentsRepository.findByPk(commentId)
        if(!comment){
            throw new HttpException(`comment with id ${commentId} not found`, HttpStatus.NOT_FOUND)
        }
        return comment
    }
    async delete(id: number){
        let comment = await this.getOne(id)
        await comment.destroy({force: true})
        return HttpStatus.OK
    }

    async getTitleComments({titleId, page, limit}: GetCommentsDto) {
       try {
           page = page || 1
           limit = limit || 9
           let offset = page * limit - limit
           let comments = await this.commentsRepository.findAll({
               where: {titleId: titleId},
               attributes: {
                   include: [
                       [literal(`CAST((SELECT COUNT(*) FROM "Likes" as "l" WHERE "l"."commentId" = "Comments"."id") AS INTEGER)`), 'likeCount'],
                       [literal(`CAST((SELECT COUNT(*) FROM "Dislikes" as "d" WHERE "d"."commentId" = "Comments"."id") AS INTEGER)`), 'dislikeCount'],
                   ]
               },
               limit: limit,
               offset: offset,
           })
           return comments
       }
       catch (e) {
           throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async likeComment(commentId: number, userId: number) {
        const existingDislike = await this.dislikeRepository.findOne({ where: {userId, commentId}})
        if (existingDislike) {
            await existingDislike.destroy();
        }
        const existingLike = await this.likeRepository.findOne({where: {userId, commentId}})
        if(existingLike){
            throw new HttpException("user already like this comment", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return  this.likeRepository.create({userId, commentId})
    }

    async dislikeComment(commentId: number, userId:number) {
        const existingLike = await this.likeRepository.findOne({where: {userId, commentId}})
        if(existingLike){
            await existingLike.destroy();
        }
        const existingDislike = await this.likeRepository.findOne({where: {userId, commentId}})
        if(existingDislike){
            throw new HttpException("user already disliked this comment", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return  this.dislikeRepository.create({userId, commentId})
    }
}
