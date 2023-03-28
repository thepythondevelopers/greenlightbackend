/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Chat: import("mongoose").Model<import("mongoose").Document<any> & {
    message: string;
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    created_at: string;
    to: any;
    by: any;
    read_status: boolean;
} & {
    to?: unknown;
    by?: unknown;
}> & {
    [name: string]: Function;
};
export default Chat;
