
import { createSchema, Type, typedModel } from 'ts-mongoose';
const social_type = [null, "GOOGLE", "FACEBOOK", "APPLE"]
const type = ["0,","1","2"]//0=>False/Delete 1=>True/Active 2=>Deactive



const UserSchema:any = createSchema({
    social_type: Type.string({ default: null, enum: social_type }),
    social_token: Type.string({ default: null }),

    first_name: Type.string({ default: null }),
    last_name: Type.string({ default: null }),
    dob:Type.string({default:null}),
    display_name: Type.string({ default: null }),
    email: Type.string({ default: null }),
    password: Type.string({ default: null }),
    gender: Type.string({ default: null }),
    height: Type.string({ default: null }),
    eyes: Type.string({ default: null }),
    eyes_other: Type.string({ default: null }),
    hair_color_other: Type.string({ default: null }),
    hair_color: Type.string({ default: null }),
    smoking:Type.string({default:null}),
    marijuana: Type.string({default: null}),
   drugs:Type.string({default:null}),
   have_kids:Type.string({default:null}),
   want_kids:Type.string({default:null}),
   astrology_sign: Type.string({ default: null }),
   ethinicity:Type.string({default:null}),
   looking_for:Type.string({default:null}),
   interests: Type.array().of(Type.string({ default: [] })),
   alcohol: Type.string({ default: null }),
   interested_in: Type.array().of(Type.string({ default: [] })),
   religion:Type.string({default:null}),
   politics: Type.string({ default: null }),
   have_car:Type.string({ default: null }),
   work:{
    position:Type.string({default:null}),
    employer:Type.string({default:null})
   },
   education_school:Type.string({default:null}),
   about_me:Type.string({default:null}),
   location:Type.string({default:null}),
   latLng:{
    type:Type.string({default:"Point"}),
    coordinates: Type.array().of(Type.number({ default: [] })),
   },
   mobile:Type.number({default:0}),
   country:Type.string({default:null}),
   state:Type.string({default:null}),
   city:Type.string({default:null}),
   zipcode:Type.string({default:null}),
   images: Type.array().of(Type.number({ default: [] })), 
    role:Type.string({default:"User"}),
    password_reset_token:Type.string({default:null}),
    password_reset_time:Type.string({default:null}),
    status:Type.string({default:1,enum:type}),
    plan:Type.string({default:"Basic"}),
    singup_type:Type.string({default:"web"}),
    email_verified:Type.boolean({default:false}),
    otp:Type.number({default:0}),
   created_at: Type.string({ default: +new Date() })

})

UserSchema.index({latLng: '2dsphere'});

const Users = typedModel('users', UserSchema);
export default Users