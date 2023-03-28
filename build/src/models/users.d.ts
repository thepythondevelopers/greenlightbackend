/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Users: import("mongoose").Model<import("mongoose").Document<any> & {} & {}> & {
    [name: string]: Function;
};
export default Users;
