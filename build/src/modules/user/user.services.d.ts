declare const Generate_User_Token: (_id: string, req_data: any) => Promise<unknown>;
declare const save_session_data: (token: string, token_data: any, req_data: any) => Promise<unknown>;
declare const make_user_response: (token_data: any) => Promise<any>;
declare const verifyUserInfo: (query: any) => Promise<unknown>;
declare const setUserData: (data: any) => Promise<any>;
declare const createNewUser: (data: any) => Promise<unknown>;
declare const random_code: (length: number) => Promise<string>;
declare const generate_file_name: (file_name: string) => Promise<string>;
export { Generate_User_Token, save_session_data, make_user_response, verifyUserInfo, setUserData, createNewUser, random_code, generate_file_name };
