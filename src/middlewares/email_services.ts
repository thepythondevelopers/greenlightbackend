import path from "path";
import sendEmail from "./send_email";
import fs from 'fs';
const client = require('twilio')("AC7deea48ea38c3e95dd6747ac100a3938", "3e8ee521c1c4adf432bd289d7e813a7d");


// import resend from '../../email_templates/email_verification.html'

const sendWelcomeMail = async (data: any) => {
    try {
        let { email, otp, display_name } = data
        let subject = 'Welcome to greenlight!';
        let file_path = path.join(__dirname, '../email_templates/email_verification.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%USER_NAME%', display_name)
        html = html.replace('%OTP%', otp)
        await sendEmail(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}




const forgotPasswordMail = async (data: any) => {
    try {
        let { email, password_reset_token, display_name } = data
        let subject = 'Resend OTP';
        let file_path = path.join(__dirname, '../email_templates/reset_password.html');
        let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
        html = html.replace('%USER_NAME%', display_name)
        html = html.replace('%SECURITY_CODE%', password_reset_token)
        await sendEmail(email, subject, html)
    }
    catch (err) {
        throw err;
    }
}


export {
    sendWelcomeMail,
    forgotPasswordMail
    
}