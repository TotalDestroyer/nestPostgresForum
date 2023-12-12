import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class UpdateTypeDto {
    @ApiProperty({type: Number, required: true, example: 1})
    @IsNumber({}, {message: "must be a number"})
    readonly id: number;
    @ApiProperty({type: String, required: true, example: "Film"})
    @IsString({message: "name must be a string"})
    readonly name: string
    @ApiProperty({type: String, required: true, example: "description of type"})
    @IsString({message: "name must be a string"})
    readonly description: string
}