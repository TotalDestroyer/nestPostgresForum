import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString} from "class-validator";

export class CreateCommentDto{
    @ApiProperty({type: Number, example: 1, description: "title id"})
    @IsInt()
    private titleId

    @ApiProperty({type: Number, example: 1, description: "user id"})
    @IsInt()
    private userId

    @ApiProperty({type: String, example: 1, description: "some comment"})
    @IsString()
    private body
}