import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsOptional, IsString} from "class-validator";

export class CreateCharacterDto {

   @IsString({message: "must be a string"})
   @ApiProperty({example: "Alucard", description: "name of character"})
   readonly name: string;

   @IsString({message: "must be a string"})
   @ApiProperty({example: "Alucard is a vampire and main protagonist of the Hellsing ...", description: "description of character"})
   readonly description: string;

   @ApiProperty({example: ["Алукард", "アーカード", "Kyuuketsuki Aakaado"], required: false, type: Array})
   @IsOptional()
   @IsArray()
   @IsString({ each: true })
   readonly other_names: string[];
}