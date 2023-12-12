import {ApiProperty} from "@nestjs/swagger";
import { Readable } from 'stream';
import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class TitleCreateDto{
    @IsString()
    @ApiProperty({example: "Hellsing Ultimate", description: "poster"})
    readonly name: string;

    @IsString()
    @ApiProperty({example: "There exist creatures of darkness and evil that plague the night, devouring any human unfortunate", description: "description"})
    readonly description: string;

    @IsOptional()
    @IsString()
    @ApiProperty({example: "R+", description: "age rating", required: false})
    readonly ageRating: string;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 10, description: "episodes",  required: false})
    readonly episodes: number;

    @Type(() => Number)
    @IsNumber({}, {message: "episodeLength should be a number"})
    @ApiProperty({example: 49, description: "time of one episode",  required: false})
    readonly episodeLength: number;

    @IsArray({ message: 'IDs must be an array' })
    @IsOptional()
    @IsNumber({}, { each: true, message: 'Each element in the array must be a number' })
    @ApiProperty({example: [1, 2, 3], description: "title character", required: false})
    readonly characters: number[];

    @ApiProperty({example: [1, 2, 3], description: "title genres", required: false})
    @IsOptional()
    @IsArray({ message: 'IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each element in the array must be a number' })
    readonly genres: number[];

    @ApiProperty({example: [1, 2, 3], description: "title types", required: false})
    @IsOptional()
    @IsArray({ message: 'IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each element in the array must be a number' })
    readonly types: number[];

}