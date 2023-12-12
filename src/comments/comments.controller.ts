import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, UseGuards} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comments.service";
import {ApiOkResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {Comments} from "./models/comments.model";
import {GetCommentsDto} from "./dto/get-comments.dto";
import {Like} from "./models/like.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}
    @ApiOkResponse({status: HttpStatus.OK, type: Comments})
    @ApiOperation({summary: "Create comment"})
    @Post()
    create(@Body() dto: CreateCommentDto){
        return this.commentService.create(dto)
    }
    @ApiOkResponse({status: HttpStatus.OK, type: [Comments]})
    @ApiOperation({summary: "Get comments from title"})
    @Get("/:titleId/config/:limit?/page?")
    getTitleComments(@Query() dto: GetCommentsDto){
        return this.commentService.getTitleComments(dto)
    }
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiParam({description: 'comment Id', required: true, type: Number, name: "commentId"} )
    @ApiOperation({summary: "Delete comment"})
    @Delete("/:commentId")
    delete(@Param("commentId") commentId){
        return this.commentService.delete(commentId)
    }

    @ApiOkResponse({type: Comments})
    @ApiParam({description: 'comment Id', required: true, type: Number, name: "commentId"} )
    @ApiOperation({summary: "get one comment"})
    @Get("/:commentId")
    getOne(@Param("commentId") commentId){
        return this.commentService.getOne(commentId)
    }
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({status: HttpStatus.OK, type: Like})
    @ApiOperation({summary: "Like comment"})
    @ApiParam({description: 'comment Id', required: true, type: Number, name: "commentId"} )
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @Post("/:commentId/like/:userId")
    likeComment(@Param('commentId') commentId: number, @Param('userId') userId: number){
        return this.commentService.likeComment(commentId, userId)
    }
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({status: HttpStatus.OK, type: Like})
    @ApiOperation({summary: "Dislike comment"})
    @ApiParam({description: 'comment Id', required: true, type: Number, name: "commentId"} )
    @ApiParam({description: 'user Id', required: true, type: Number, name: "userId"} )
    @Post("/:commentId/dislike/:userId")
    dislikeComment(@Param('commentId') commentId: number, @Param('userId') userId: number){
        return this.commentService.dislikeComment(commentId, userId)
    }
}
