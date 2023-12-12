import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {FriendsService} from "./friends.service";
import {ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiTags} from "@nestjs/swagger";
import {Favorites} from "../favorites/models/favorites.model";
import {FriendsRequestsModel} from "./friends-requests.model";
import {FriendsModel} from "./friends.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
@ApiTags("Friends")
@Controller('friends')
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiParam({description: 'sender Id', required: true, type: Number, name: "senderId"} )
    @ApiParam({description: 'taker Id', required: true, type: Number, name: "takerId"} )
    @ApiOperation({summary: "Send friend request to user"})
    @ApiOkResponse({type: FriendsRequestsModel})
    @Post("/send/:senderId/:takerId")
    sendRequest(@Param("senderId") senderId, @Param("takerId") takerId){
        return this.friendsService.sendRequest(senderId, takerId)
    }
    @UseGuards(JwtAuthGuard)
    @ApiParam({description: 'request Id', required: true, type: Number, name: "requestId"} )
    @ApiOperation({summary: "Accept friend request"})
    @Put("/request/accept/:requestId")
    @ApiOkResponse({type: FriendsRequestsModel})
    acceptRequest(@Param("requestId") requestId){
        return this.friendsService.acceptRequest(requestId)
    }
    @UseGuards(JwtAuthGuard)
    @ApiParam({description: 'request Id', required: true, type: Number, name: "requestId"} )
    @ApiOperation({summary: "Reject friend request"})
    @ApiOkResponse({status: HttpStatus.OK})
    @Delete("/request/reject/:requestId")
    rejectRequest(@Param("requestId") requestId){
        return this.friendsService.rejectRequest(requestId)
    }

    @ApiOperation({summary: "Get all user friend's"})
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"})
    @ApiOkResponse({type: [FriendsModel]})
    @Get("/:userId")
    getFriends(@Param("userId") userId){
        return this.friendsService.getFriends(userId)
    }

    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @ApiOperation({summary: "Get all user friend request's"})
    @ApiOkResponse({type: [FriendsRequestsModel]})
    @Get("/getRequests/:userId")
    getRequests(@Param("userId") userId){
        return this.friendsService.getRequests(userId)
    }
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Delete friend"})
    @Delete("/user/:userId/removeFriend/:friendId")
    @ApiOkResponse({status: HttpStatus.OK})
    deleteFriend(@Param() userId: number, @Param() friendId: number){
        return this.friendsService.deleteFriend(userId, friendId)
    }

}
