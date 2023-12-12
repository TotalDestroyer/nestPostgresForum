import {IsDate, IsEmail, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "mail@gmail.com", description: "User email"})
    @IsString({message: "must be a string"})
    @IsEmail({}, {message: "must be email"})
    readonly email: string;

    @IsOptional()
    @ApiProperty({example: "Fluffy cat", description: "User nickname"})
    @IsString({message: "nickname must be a string"})
    @Length(4, 24, {message: "nickname length should be no more than 24 and no less than 4"})
    readonly nickname: string;

    @ApiProperty({example: "123125321", description: "User password"})
    @IsString({message: "must be a string"})
    @Length(6, 24, {message: "length should be no more than 24 and no less than 6"})
    readonly password: string;

    @IsOptional()
    @ApiProperty({example: "2016-02-01 00:00:00+00:00", description: "user brith date"})
    @IsDate({message: "must be a date"})
    readonly dateOfBirth: Date;
}

