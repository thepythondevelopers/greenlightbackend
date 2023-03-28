/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Light1: import("mongoose").Model<import("mongoose").Document<any> & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    created_at: string;
    user1: any;
    sent_to1: any;
    sent_light1: string;
    user2: any;
    sent_to2: any;
    sent_light2: string;
} & {
    user1?: unknown;
    sent_to1?: unknown;
    user2?: unknown;
    sent_to2?: unknown;
}> & {
    [name: string]: Function;
};
export default Light1;
