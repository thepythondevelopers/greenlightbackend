declare const generateToken: (token_data: any) => Promise<unknown>;
declare const decodeToken: (token: string, type: string, res: any) => Promise<unknown>;
declare const verifyToken: (token: string, type: string, res: any) => Promise<any>;
export { generateToken, decodeToken, verifyToken };
