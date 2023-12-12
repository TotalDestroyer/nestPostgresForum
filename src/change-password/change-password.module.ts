import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordController } from './change-password.controller';
import {UserModule} from "../user/user.module";
import {EmailsModule} from "../emails/emails.module";
import {User} from "../user/user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [ChangePasswordService],
  controllers: [ChangePasswordController],
  imports: [
      UserModule,
      EmailsModule,
      SequelizeModule.forFeature([User]),
      ConfigModule
  ]
})
export class ChangePasswordModule {}
