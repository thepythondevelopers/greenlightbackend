/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const UserToken: import("mongoose").Model<import("mongoose").Document<any> & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    token: string;
    created_at: string;
} & {}> & {
    [name: string]: Function;
};
export default UserToken;
