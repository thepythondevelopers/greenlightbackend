import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index'

let type =['Green','Yellow','Red']

const light1Schema = createSchema({
    user1: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    sent_to1: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    sent_light1: Type.string({ default: null,enum:type }),
    user2: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    sent_to2: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    sent_light2: Type.string({ default: null,enum:type }),
    created_at: Type.string({ default: +new Date() }),
})

const Light1 = typedModel('light1', light1Schema);
export default Light1