import nodemailer from 'nodemailer'
import { config } from 'dotenv'
config()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            }
        )
    }

    
    async sendMailActivation(to, link) {
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
