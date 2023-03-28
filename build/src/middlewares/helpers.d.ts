declare const setOptions: (pagination: any, limit: any) => Promise<any>;
declare const GenerateOtp: () => Promise<string>;
declare const generateGroupLink: (name: any) => Promise<string>;
declare const genUniqueCode: (collection: any) => Promise<string>;
declare const bcryptPassword: (password: string) => Promise<any>;
declare const decryptPassword: (password: string, hash: string) => Promise<any>;
declare const genrate_coupon_code: () => Promise<string>;
export { setOptions, GenerateOtp, genUniqueCode, bcryptPassword, decryptPassword, genrate_coupon_code, generateGroupLink };
