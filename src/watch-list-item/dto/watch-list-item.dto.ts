import {IsNumber, IsOptional, IsString, Validate} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {IsCorrectStatusValidator} from "../../validators/isCorrectStatus.validator";

export class WatchListItemDto {

    @ApiProperty({example: 1, description: "watch list id"})
    @IsNumber({}, {message: "must be a number"})
    readonly watchListId: number;

    @ApiProperty({example: 1, description: "title id"})
    @IsNumber({}, {message: "must be a number"})
    readonly titleId: number;

    @ApiProperty({
        description: 'item status',
        required: false,
    })
    @IsString({message: "must be a string"})
    @Validate(IsCorrectStatusValidator)
    @IsOptional()
    readonly status?: string;
}


