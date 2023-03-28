/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Sessions: import("mongoose").Model<import("mongoose").Document<any> & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    type: string;
    token: string;
    user_id: any;
    device_type: string;
    fcm_token: string;
    token_gen_at: string;
    created_at: string;
} & {
    user_id?: unknown;
}> & {
    [name: string]: Function;
};
export default Sessions;
