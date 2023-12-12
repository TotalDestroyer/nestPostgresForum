import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
@Injectable()
export class EmailsService {
    constructor(private transporter: MailerService) {}
    async senActivationMail(to, link, nickname){
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: to,
                subject: 'Account activation in ' + process.env.API_URL,
                text : `Hi, ${nickname}`,
                html: `
                <div style="margin-top: 30px">
                    <h1>To activate yout account click link below</h1>
                    <a 
                        href="${link}" 
                        style="padding: 10px 20px 10px 20px; background: deepskyblue; color: white; border-radius: 5px; text-decoration: none"
                    >
                    confirm
                    </a>
                </div>
                `
            })
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async sendChangePasswordMail(to, link, nickname){
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: to,
                subject: 'Change password in' + process.env.API_URL,
                text : `Hi, ${nickname}`,
                html: `
                <div style="margin-top: 30px">
                    <h1>To confirm your new password click button below</h1>
                    <a 
                        href="${link}"
                        style="padding: 10px 20px 10px 20px; background: deepskyblue; color: white; border-radius: 5px; text-decoration: none"
                     >
                     confirm
                     </a>
                </div>
                `
            })
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async sendChangeEmailMail(to, link, nickname) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: to,
                subject: 'Change email in' + process.env.API_URL,
                text : `Hi, ${nickname}`,
                html: `
                <div style="margin-top: 30px">
                    <h1>To confirm your new password click button below</h1>
                    <a 
                        href="${link}"
                        style="padding: 10px 20px 10px 20px; background: deepskyblue; color: white; border-radius: 5px; text-decoration: none"
                     >
                     confirm
                     </a>
                </div>
                `
            })
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
