import {IsNumber, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class GetCommentsDto {
    @ApiProperty({type: Number, required: true, example: 1, description: "title id"})
    @Type(() => Number)
    public titleId: number;

    @ApiProperty({type: Number, required: false, example: 10, description: "limit of comments"})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public limit: number;

    @ApiProperty({type: Number, required: false, example: 2, description: "page"})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public page: number;
}