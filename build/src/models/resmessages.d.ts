/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const ResMessages: import("mongoose").Model<import("mongoose").Document<any> & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    type: string;
    status_code: number;
    message_type: string;
    msg_in_english: string;
    msg_in_arabic: string;
    created_at: string;
} & {}> & {
    [name: string]: Function;
};
export default ResMessages;
