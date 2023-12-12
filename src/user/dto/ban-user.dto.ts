import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BanUserDto{
    @IsNumber({}, {message: "id must be a number"})
    @ApiProperty({example: 1, description: "user id"})
    readonly userId: number;

    @IsString({message: "banReason must be a string"})
    @ApiProperty({example: "toxic", description: "reason"})
    readonly  banReason: string;
}