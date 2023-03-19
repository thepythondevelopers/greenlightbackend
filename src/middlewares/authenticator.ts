
import { verifyToken, handleCatch, handleCustomError } from './index';
import * as DAO from "../DAO";
import * as Models from '../models';
import {  app_constant } from '../config/index';
const { scope } = app_constant
const admin_scope = scope.admin
const user_scope = scope.user



const authenticator = async (req: any, res: any, next: any) => {
    try {

        let { token } = req.headers, api_path = req.originalUrl
        let set_language = 'ENGLISH';

        let { language: body_language } = req.body, { language: query_language } = req.query
        if (body_language != undefined) { set_language = body_language }
        if (query_language != undefined) { set_language = query_language }

       
        let user_path = api_path.includes("api")
       

        if (user_path) {
            let fetch_token_data: any = await verifyToken(token, user_scope, res)
            if (fetch_token_data) {

                let { user_id, token, device_type, fcm_token, token_gen_at } = fetch_token_data


                let query: any = { _id: user_id }
                let projection = { __v: 0, password: 0 }
                let options = { lean: true }
                let fetch_data: any = await DAO.getData(Models.Users, query, projection, options)

                if (fetch_data.length > 0) {

                    fetch_data[0].token = token
                    fetch_data[0].device_type = device_type
                    fetch_data[0].fcm_token = fcm_token
                    fetch_data[0].token_gen_at = token_gen_at
                    req.user_data = fetch_data[0]
                    req.session_data = fetch_token_data
                    next();

                } 

                
                else {
                    return res.status(403).send({error:"A token is required for authentication"});
                }

            } else {
                return res.status(403).send({error:"A token is required for authentication"});
            }
        }
        else {
            return res.status(403).send({error:"A token is required for authentication"});
        }

    }
    catch (err) {
        handleCatch(res, err)
    }
}

export default authenticator