import { createSchema, Type, typedModel } from 'ts-mongoose';


const userTokenSchema = createSchema({
    token: Type.string({ default: null }),
    created_at: Type.string({ default: +new Date() })
})

const UserToken = typedModel('UserToken', userTokenSchema);
export default UserToken