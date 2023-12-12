import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {EmailsService} from "../emails/emails.service";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {ConfigService} from "@nestjs/config";
import * as uuid from "uuid"
import {ChangeEmailRequestDto} from "./dto/change-email-request.dto";


@Injectable()
export class ChangeEmailService {

    constructor(private userService: UserService, private mailService: EmailsService,
                @InjectModel(User) private userRepository: typeof User,
                private configService: ConfigService
    ) {}

    async requestChangeEmail(dto: ChangeEmailRequestDto) {
        let user = await this.userRepository.findByPk(dto.userId)
        if(!user){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND)
        }
        const token = uuid.v4()
        user.pendingEmail = dto.newEmail
        user.changeEmailToken = token
        await user.save()
        await this.mailService.sendChangeEmailMail(user.email, `${this.configService.get("api_url")}/change-email/confirm/${token}`, user.nickname)
        return HttpStatus.OK
    }

    async confirmEmailChange(changeEmailToken: string) {
        let user = await this.userRepository.findOne({where: {changeEmailToken}})
        if(!user){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND, )
        }
        await user.update({email: user.pendingEmail, pendingEmail: null, changeEmailToken: null})
        return HttpStatus.OK
    }
}
