"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const social_type = [null, "GOOGLE", "FACEBOOK", "APPLE"];
const type = ["0,", "1", "2"]; //0=>False/Delete 1=>True/Active 2=>Deactive
const UserSchema = ts_mongoose_1.createSchema({
    social_type: ts_mongoose_1.Type.string({ default: null, enum: social_type }),
    social_token: ts_mongoose_1.Type.string({ default: null }),
    first_name: ts_mongoose_1.Type.string({ default: null }),
    last_name: ts_mongoose_1.Type.string({ default: null }),
    dob: ts_mongoose_1.Type.string({ default: null }),
    display_name: ts_mongoose_1.Type.string({ default: null }),
    email: ts_mongoose_1.Type.string({ default: null }),
    password: ts_mongoose_1.Type.string({ default: null }),
    gender: ts_mongoose_1.Type.string({ default: null }),
    height: ts_mongoose_1.Type.string({ default: null }),
    eyes: ts_mongoose_1.Type.string({ default: null }),
    eyes_other: ts_mongoose_1.Type.string({ default: null }),
    hair_color_other: ts_mongoose_1.Type.string({ default: null }),
    hair_color: ts_mongoose_1.Type.string({ default: null }),
    smoking: ts_mongoose_1.Type.string({ default: null }),
    marijuana: ts_mongoose_1.Type.string({ default: null }),
    drugs: ts_mongoose_1.Type.string({ default: null }),
    have_kids: ts_mongoose_1.Type.string({ default: null }),
    want_kids: ts_mongoose_1.Type.string({ default: null }),
    astrology_sign: ts_mongoose_1.Type.string({ default: null }),
    ethinicity: ts_mongoose_1.Type.string({ default: null }),
    ethinicity_other: ts_mongoose_1.Type.string({ default: null }),
    politics_other: ts_mongoose_1.Type.string({ default: null }),
    looking_other: ts_mongoose_1.Type.string({ default: null }),
    looking_for: ts_mongoose_1.Type.string({ default: null }),
    interests: ts_mongoose_1.Type.array().of(ts_mongoose_1.Type.string({ default: [] })),
    alcohol: ts_mongoose_1.Type.string({ default: null }),
    interested_in: ts_mongoose_1.Type.array().of(ts_mongoose_1.Type.string({ default: [] })),
    religion: ts_mongoose_1.Type.string({ default: null }),
    politics: ts_mongoose_1.Type.string({ default: null }),
    have_car: ts_mongoose_1.Type.string({ default: null }),
    work: {
        position: ts_mongoose_1.Type.string({ default: null }),
        employer: ts_mongoose_1.Type.string({ default: null })
    },
    education_school: ts_mongoose_1.Type.string({ default: null }),
    about_me: ts_mongoose_1.Type.string({ default: null }),
    location: ts_mongoose_1.Type.string({ default: null }),
    latLng: {
        type: ts_mongoose_1.Type.string({ default: "Point" }),
        coordinates: ts_mongoose_1.Type.array().of(ts_mongoose_1.Type.number({ default: [] })),
    },
    mobile: ts_mongoose_1.Type.number({ default: 0 }),
    country: ts_mongoose_1.Type.string({ default: null }),
    state: ts_mongoose_1.Type.string({ default: null }),
    city: ts_mongoose_1.Type.string({ default: null }),
    zipcode: ts_mongoose_1.Type.string({ default: null }),
    images: ts_mongoose_1.Type.array().of(ts_mongoose_1.Type.number({ default: [] })),
    role: ts_mongoose_1.Type.string({ default: "User" }),
    password_reset_token: ts_mongoose_1.Type.string({ default: null }),
    password_reset_time: ts_mongoose_1.Type.string({ default: null }),
    status: ts_mongoose_1.Type.string({ default: 1, enum: type }),
    plan: ts_mongoose_1.Type.string({ default: "Basic" }),
    singup_type: ts_mongoose_1.Type.string({ default: "web" }),
    email_verified: ts_mongoose_1.Type.boolean({ default: false }),
    otp: ts_mongoose_1.Type.number({ default: 0 }),
    created_at: ts_mongoose_1.Type.string({ default: +new Date() })
});
UserSchema.index({ latLng: '2dsphere' });
const Users = ts_mongoose_1.typedModel('users', UserSchema);
exports.default = Users;
