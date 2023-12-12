import { Module } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailController } from './change-email.controller';
import {UserModule} from "../user/user.module";
import {EmailsModule} from "../emails/emails.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [ChangeEmailService],
  controllers: [ChangeEmailController],
  imports: [
    UserModule,
    EmailsModule,
    SequelizeModule.forFeature([User]),
    ConfigModule
  ]
})
export class ChangeEmailModule {}
