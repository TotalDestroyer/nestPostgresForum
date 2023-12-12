import {Transform, Type} from "class-transformer";
import {IsNumber, IsString, Validate} from "class-validator";
import {IsCorrectStatusValidator} from "../../validators/isCorrectStatus.validator"
import {ApiProperty} from "@nestjs/swagger";

export class ChangeStatusDto {
    @ApiProperty({
        description: 'item id',
        required: true,
    })
    @Type(() => Number)
    @IsNumber({}, {message: "must be a number"})
    readonly id: number;

    @ApiProperty({
        description: 'new item status',
        required: true,
    })
    @IsString({message: "must be a string"})
    @Validate(IsCorrectStatusValidator)
    readonly newStatus: string;
}