import FCM from 'fcm-push';
import { config } from 'dotenv';
import { handleCatch } from './handler';
import { handleSuccess } from './handler';
config();
const server_key = process.env.NOTIFICATION_KEY

const sendNotification = async (data: any, fcm_token: string) => {
    try {

        const fcm = new FCM(server_key)

        let message = {
            to: fcm_token,
            data: data,
            notification: {
                type: data.type ,
                    title: data.title,
                    body: data.message,
                    notif_type: data.notif_type,
                    sound: 'default',
                    badge: 0, 
                    priority: "high",
                    content_available: true,
                    foreground: true,
                    show_in_foreground: true 
            }
        }

        fcm.send(message, function (err: any, result: any) {
            if (err) { console.log(handleCatch) }
            else { console.log(handleSuccess) }
        });

    }
    catch (err) {
        throw err;
    }
}


export { sendNotification }