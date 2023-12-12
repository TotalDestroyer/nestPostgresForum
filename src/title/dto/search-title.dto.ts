import {ApiProperty} from "@nestjs/swagger";
import {ArrayNotEmpty, IsArray, IsInt, IsNumber, IsOptional, IsString, ValidateIf} from "class-validator";
import {Transform} from "class-transformer";
import {IsOptionalNonNullable} from "../../validators/IsOptionalNonNullable.validator";
import {Is} from "sequelize-typescript";

export class SearchTitleDto {
    @ApiProperty({
        description: 'title name',
        required: false,
        type: String
    })
    @IsOptional()
    @IsString({message: "must be a string"})
    readonly name?:string

    @IsOptional()
    @ApiProperty({
        description: 'how much search results u get',
        required: false,
        type: String
    })
    @IsNumber()
    readonly limit?: number

    @ApiProperty({
        description: 'by which genres u search',
        required: false,
        type: Number,
        isArray: true
    })
    @IsOptional()
    @Transform(({ value }) => {
        try {
            return JSON.parse(value).map(Number)
        } catch (error) {
            console.error('Error parsing array:', error);
            return []
        }
    })
    @IsArray({ message: 'IDs must be an array' })
    @ArrayNotEmpty({ message: 'IDs array must not be empty' })
    @IsNumber( {},{ each: true, message: 'Each element in the array must be a number' })
    readonly genres?: number[]

    @ApiProperty({
        description: 'by which types u search',
        required: false,
        type: Number,
        isArray:true
    })
    @IsOptional()
    @IsArray({ message: 'IDs must be an array' })
    @ArrayNotEmpty({ message: 'IDs array must not be empty' })
    @Transform(({ value }) => {
        try {
            return JSON.parse(value);
        } catch (error) {
            console.error('Error parsing array:', error);
            return []
        }
    })
    @IsInt({ each: true, message: 'Each element in the array must be a number' })
    readonly types?: number[]
}
