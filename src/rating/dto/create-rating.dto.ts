import {IsInt, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRatingDto{
    @ApiProperty({type: Number, example: 1, description: "user rate (1 - 10)"})
    @Min(1)
    @Max(10)
    @IsInt()
    rating: number

    @ApiProperty({type: Number, example: 1, description: "user id"})
    @IsInt()
    userId: number;

    @ApiProperty({type: Number, example: 1, description: "title id"})
    @IsInt()
    titleId: number;

    @ApiProperty({type: Number, example: 1, description: "user watch list id"})
    @IsInt()
    watchListId: number;
}