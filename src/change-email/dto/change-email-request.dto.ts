import {IsEmail, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ChangeEmailRequestDto{

    @ApiProperty({description: "user id", example: "1", type:Number})
    @IsNumber({}, {message: "userId must be a number"})
    readonly userId: number;

    @ApiProperty({description: "user new email", example: "mail123@mail.com", type: String})
    @IsEmail({}, {message: "email must look like 'mail123@mail.com'"})
    @IsString({message: "newEmail must be a string"})
    readonly newEmail: string;

}