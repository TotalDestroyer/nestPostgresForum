import {Body, Controller, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {ChangePasswordService} from "./change-password.service";
import {ChangeRequestDto} from "./dto/change-request.dto";
import {ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiTags} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";
@ApiTags("change password")
@Controller('change-password')
export class ChangePasswordController {
    constructor(
        private changePasswordService: ChangePasswordService,
        private configService: ConfigService
    ) {}
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiOperation({summary: "request change password"})
    @Post('/request')
    requestChangePassword(@Body() dto: ChangeRequestDto){
        return this.changePasswordService.requestChangePassword(dto)
    }
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiOperation({summary: "password change confirmation"})
    @ApiParam({name: "token", type: String, description: "password change token"})
    @Get('confirm/:changePasswordToken')
    async confirmPasswordChange(@Param() changePasswordToken: string, @Res() res){
        await this.changePasswordService.confirmPasswordChange(changePasswordToken)
        return res.redirect(this.configService.get("frontend_url"))
    }

}
