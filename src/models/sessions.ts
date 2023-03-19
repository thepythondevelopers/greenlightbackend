import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index'
const type = [null, 'USER', 'ADMIN','SELLER']
const device_type = [null, 'iOS', 'Android']

const SessionsSchema = createSchema({
    type: Type.string({ default: null, type }),
    user_id: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    token: Type.string({ default: null }),
    device_type: Type.string({ default: null, device_type }),
    fcm_token: Type.string({ default: null }),
    token_gen_at: Type.string({ default: null }),
    created_at: Type.string({ default: +new Date() })
})

const Sessions = typedModel('sessions', SessionsSchema);
export default Sessions