import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCharacterDto {
    @ApiProperty({example: 1, description: "uniq id"})
    @IsNumber({}, {message: "id must be a number"})
    readonly id: number;

    @ApiProperty({example: "Alucard", description: "name of character", required: false})
    @IsOptional()
    @IsString({message: "name must be a string"})
    readonly name?: string;

    @ApiProperty({example: "Alucard is a vampire and main protagonist of the Hellsing ...", description: "description of character", required: false})
    @IsOptional()
    @IsString({message: "description must be a string"})
    readonly description?: string;

    @ApiProperty({example: ["Алукард", "アーカード", "Kyuuketsuki Aakaado"], required: false, type: Array})
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly otherNames?: string[];
}