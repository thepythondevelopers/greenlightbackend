"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const userTokenSchema = ts_mongoose_1.createSchema({
    token: ts_mongoose_1.Type.string({ default: null }),
    created_at: ts_mongoose_1.Type.string({ default: +new Date() })
});
const UserToken = ts_mongoose_1.typedModel('UserToken', userTokenSchema);
exports.default = UserToken;
