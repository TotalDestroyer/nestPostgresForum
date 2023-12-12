import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {FriendsRequestsModel} from "./friends-requests.model";
import {FriendsModel} from "./friends.model";
import {where} from "sequelize";
import {UserService} from "../user/user.service";

@Injectable()
export class FriendsService {
    constructor(
        @InjectModel(FriendsRequestsModel)
        private requestRepository: typeof FriendsRequestsModel,
        @InjectModel(FriendsModel)
        private friendsRepository: typeof FriendsModel,
        private userService: UserService
    ) {}

    async sendRequest(senderId: number, takerId: number) {
        await this.userService.getById(senderId)
        await this.userService.getById(takerId)
        const request = await this.requestRepository.create({
            senderId,
            takerId,
            accept: false,
        });
        return request;
    }
    async acceptRequest(requestId: number) {
        const request = await this.requestRepository.findByPk(requestId);
        if (!request) {
            throw new HttpException("No friend request with this ID found", HttpStatus.NOT_FOUND)
        }
        await request.update({ accept: true });
        await this.friendsRepository.create({
            id1: request.senderId,
            id2: request.takerId,
        });
        return request;
    }

    async rejectRequest(requestId: number) {
        const request = await this.requestRepository.findByPk(requestId);
        if (!request) {
            throw new HttpException("No friend request with this ID found", HttpStatus.NOT_FOUND)
        }
        await request.destroy();
        return HttpStatus.OK;
    }

    async getFriends(userId: number) {
        const friends = await this.friendsRepository.findAll({
            where: { id1: userId},
            include: [{model: User, as: "secondUser"}]
        });
        return friends;
    }

    async getRequests(userId: number) {
        const requests = await this.requestRepository.findAll({where: {takerId: userId}})
        return requests
    }

    async deleteFriend(userId: number, friendId: number) {
        await this.friendsRepository.destroy({where: {id1: userId, id2: friendId}})
        return HttpStatus.OK
    }
}
