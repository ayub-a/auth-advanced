import { config } from 'dotenv'
config()

import nodemailer, { Transporter } from 'nodemailer'


class MailService {
    
    private transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            }
        )
    }

    
    async sendMailActivation(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activating account on ${process.env.API_URL}`,
            text: '',
            html: 
                `
                    <div>
                        <h2>To activate your account follow the link:</h2>
                        <a href="${link}">${link}</a>
                    </div
                `
        })
    }

}


export default new MailService
