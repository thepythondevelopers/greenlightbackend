import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index';

const type = [

]

const NotificationSchema = createSchema({
    user_id: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    type: Type.string({ default: null, enum: type }),
    title: Type.string({ default: null }),
    message: Type.string({ default: null }),
    created_at: Type.string({ default: +new Date()})
})


const Notifications = typedModel('notifications', NotificationSchema);
export default Notifications