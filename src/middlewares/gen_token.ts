
import * as DAO from "../DAO";
import * as Models from '../models';
import jwt from 'jsonwebtoken'
import {  app_constant } from '../config/index';
import { handleCustomError } from './index';


const { seckretKeys } = app_constant
const options = { algorithm: "HS256" };
const admin_seckret_key = seckretKeys.admin_seckret_key;
const user_seckret_key = seckretKeys.user_seckret_key;


// STEP 1 : GENERATE TOKEN
const generateToken = (token_data: any) => {

    return new Promise((resolve, reject) => {
        try {

            let seckret_key = null;
            if (token_data.scope == "admin") { seckret_key = admin_seckret_key }
            if (token_data.scope == "user") { seckret_key = user_seckret_key }

            const token = jwt.sign(token_data, seckret_key)
            return resolve(token);

        }
        catch (err) {
            throw reject(err);
        }
    })

}


const decodeToken = (token: string, type: string, res: any) => {

    return new Promise(async (resolve, reject) => {
        try {
           
            let set_seckret_key = null;
            if (type == "admin") { set_seckret_key = admin_seckret_key }
            else if (type == "user") { set_seckret_key = user_seckret_key }
            console.log("SET SECRET KEY",set_seckret_key)
           

            // let fetch_error = await handleCustomError('UNAUTHORIZED', language)
           jwt.verify(token, set_seckret_key, (err: any, decoded: any) => {
                if (decoded == undefined) {
                    // return reject(fetch_error);
                    res.status(403).send({error:"A token is required for authentication"});
                } else {
                    return resolve(decoded)
                    console.log("decoded",decoded)
                }
            });

        }
        catch (err) {
            console.log("6")
            res.status(403).send({error:"A token is required for authentication"});
        }
    })

}


// STEP 2 : VERIFY TOKEN
const verifyToken = async (token: string, type: string, res: any) => {
    try {
        console.log("INSIDE verify---")

        let decoded: any = await decodeToken(token, type, res)
        let fetch_data: any;
        console.log("verify---2---")
        if (decoded.scope == "user") {
            let query: any = {
                user_id: decoded._id,
                token: { $ne: null },
                token_gen_at: decoded.token_gen_at
            }
            let projection = { __v: 0 }
            let options = { lean: true }
            fetch_data = await DAO.getData(Models.Sessions, query, projection, options)
        }

        if (fetch_data.length) {
            return fetch_data[0]

        }
        else {
            console.log("4")
            return res.status(403).send({error:"A token is required for authentication"});
        }

    }
    catch (err) {
        console.log("5")
        return res.status(403).send({error:"A token is required for authentication"});
    }

}



export {
    generateToken,
    decodeToken,
    verifyToken
}