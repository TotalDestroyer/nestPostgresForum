import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
   @ApiProperty({example: "MODERATOR", type: String})
   @IsString()
   readonly value: string

   @ApiProperty({example: "tell about what moderator should do", type: String})
   @IsString()
   readonly description: string;
}