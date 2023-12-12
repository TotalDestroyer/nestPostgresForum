import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional, IsString} from "class-validator";

export class UpdateGenreDto {
    @ApiProperty({type: Number, required: true, example: 1})
    @IsInt()
    readonly id: number;
    @ApiProperty({type: String, required: false, example: "Horror"})
    @IsOptional()
    @IsString()
    readonly name: string
    @ApiProperty({type: String, required: false, example: "description of genre"})
    @IsOptional()
    @IsString()
    readonly description: string
}