/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Light: import("mongoose").Model<import("mongoose").Document<any> & {
    user: any;
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    light: string;
    sent: any;
    created_at: string;
} & {
    user?: unknown;
    sent?: unknown;
}> & {
    [name: string]: Function;
};
export default Light;
