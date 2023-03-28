/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const Report: import("mongoose").Model<import("mongoose").Document<any> & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    other: string;
    created_at: string;
    sexual_harassment: string;
    abuse: string;
    inappropriate_pictures: string;
    reported_by: any;
    reported_person: any;
} & {
    reported_by?: unknown;
    reported_person?: unknown;
}> & {
    [name: string]: Function;
};
export default Report;
