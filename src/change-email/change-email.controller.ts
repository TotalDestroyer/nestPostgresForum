import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ApiOkResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {ChangeEmailService} from "./change-email.service";
import {ChangeEmailRequestDto} from "./dto/change-email-request.dto";
@ApiTags("change email")
@Controller('change-email')
export class ChangeEmailController {
    constructor(
        private changeEmailService: ChangeEmailService,
        private configService: ConfigService
    ) {}

    @ApiOkResponse({status: HttpStatus.OK})
    @ApiOperation({summary: "request change email"})
    @Post('/request')
    requestChangePassword(@Body() dto: ChangeEmailRequestDto){
        return this.changeEmailService.requestChangeEmail(dto)
    }
    @ApiOkResponse({status: HttpStatus.OK})
    @ApiOperation({summary: "email change confirmation"})
    @ApiParam({name: "token", type: String, description: "password change token"})
    @Get('confirm/:changeEmailToken')
    async confirmPasswordChange(@Param() changeEmailToken: string, @Res() res){
        await this.changeEmailService.confirmEmailChange(changeEmailToken)
        return res.redirect(this.configService.get("frontend_url"))
}
}
