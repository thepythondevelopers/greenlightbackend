import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index';
    

const reportSchema = createSchema({
   
    sexual_harassment: Type.string({ default: null }),
    abuse : Type.string({ default: null }),
    inappropriate_pictures : Type.string({ default: null }),
    other : Type.string({ default: null }),
    reported_by : Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    reported_person : Type.ref(Type.objectId({ default: null })).to('users', <any>Models.Users),
    created_at: Type.string({ default: +new Date() })
})

const Report = typedModel('report', reportSchema);
export default Report;
