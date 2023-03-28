/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Notifications: import("mongoose").Model<import("mongoose").Document<any> & {
    message: string;
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    type: any;
    user_id: any;
    created_at: string;
    title: string;
} & {
    type?: unknown;
    user_id?: unknown;
}> & {
    [name: string]: Function;
};
export default Notifications;
