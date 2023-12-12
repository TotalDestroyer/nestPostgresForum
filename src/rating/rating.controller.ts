import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RatingService} from "./rating.service";
import {ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
@ApiTags("Rating")
@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Create user rate or rescore"})
    @Post("/rate")
    rateTitle(@Body() dto : CreateRatingDto){
        return this.ratingService.createRating(dto)
    }
    @ApiParam({name: "titleId", example: 1})
    @ApiOperation({summary: "get all user rates on title"})
    @Get("/get/:titleId")
    getAllByTitleId(@Param("titleId") titleId: number){
        return this.ratingService.getAll(titleId)
    }
}
