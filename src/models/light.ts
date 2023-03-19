import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index';
const type =['Green','Yellow','Red']

const lightSchema = createSchema({
    user:Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    sent: Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    light : Type.string({ default : null,enum:type }),
    created_at: Type.string({ default: +new Date() })
}) 

const Light = typedModel('light', lightSchema);
export default Light