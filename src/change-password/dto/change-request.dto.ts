import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class ChangeRequestDto{

    @ApiProperty({example: 1, description: "user id", type: Number})
    @IsNumber({}, {message: "user id must be a number"})
    readonly userId

    @ApiProperty({example: "superSecretPassword123", description: "new user password", type: String})
    @Length(6, 24, {message: "length should be no more than 24 and no less than 6"})
    @IsString({message: "new password must be string"})
    readonly newPassword
}