
import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index'


const chatSchema = createSchema({
      to: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
      by: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
      message: Type.string({ default: null }),
      read_status: Type.boolean({ default: false }),
      created_at: Type.string({ default: +new Date() })
})

const Chat = typedModel('chat', chatSchema);
export default Chat