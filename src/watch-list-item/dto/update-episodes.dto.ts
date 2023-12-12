import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class UpdateEpisodesDto {
    @ApiProperty({
        description: 'item id',
        required: true,
        type: Number
    })
    @IsNumber({}, {message: "must be number"})
    readonly id: number;
    @ApiProperty({
        description: 'quantity of series by which you increment or decrement',
        required: true,
        type: Number
    })
    @IsNumber({}, {message: "must be number"})
    readonly amount: number
}