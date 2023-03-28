import * as express from "express";
declare class userController {
    static signUp(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static signIn(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static socialLogin(req: any, res: express.Response): Promise<void>;
    static forgetPassword(req: any, res: express.Response): Promise<void>;
    static setNewPassword(req: any, res: express.Response): Promise<void>;
    static accountDelete(req: any, res: express.Response): Promise<void>;
    static accountDeactivate(req: any, res: express.Response): Promise<void>;
    static accountActivate(req: any, res: express.Response): Promise<void>;
    static logout(req: any, res: express.Response): Promise<void>;
    static getProfile(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static personalInformation(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static personalPrefrences(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static professinalInformation(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static locationInformation(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static profileImage(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static profileImageDelete(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static imagePosition(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static matchingAlgorithm(req: any, res: express.Response): Promise<void>;
    static searchMatchingAlgorithm(req: any, res: express.Response): Promise<void>;
    static saveLight(req: any, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    static yellowLight(req: any, res: express.Response): Promise<void>;
    static greenLight(req: any, res: express.Response): Promise<void>;
    static mutualGreenLight(req: any, res: express.Response): Promise<void>;
}
export default userController;
