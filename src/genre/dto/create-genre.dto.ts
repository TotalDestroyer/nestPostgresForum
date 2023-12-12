import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateGenreDto {
   @ApiProperty({type: String, required: true, example: "Horror"})
   @IsString()
   readonly name: string
   @ApiProperty({type: String, required: true, example: "description of genre"})
   @IsString()
   readonly description: string
}