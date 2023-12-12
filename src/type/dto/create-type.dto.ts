import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateTypeDto {
   @ApiProperty({type: String, required: true, example: "Film"})
   @IsString({message: "name must be a string"})
   readonly name: string

   @ApiProperty({type: String, required: true, example: "description of type"})
   @IsString({message: "description must be a string"})
   readonly description: string
}