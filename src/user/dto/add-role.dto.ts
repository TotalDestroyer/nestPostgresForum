import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto{
    @IsString()
    @ApiProperty({description: "role name", example: "ADMIN"})
    readonly value: string;
    @IsNumber()
    @ApiProperty({description: "user id", example: 1})
    readonly userId: number;
}