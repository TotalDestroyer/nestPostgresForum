import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule} from "@nestjs/config";


@Module({
  providers: [EmailsService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      }
    }),
  ],
  exports: [EmailsService]
})
export class EmailsModule {}
