import bcrypt from 'bcrypt';
import * as DAO from '../DAO';
import * as Models from '../models/index';
import random_string from "randomstring";
import { app_constant } from '../config/index';
import { Collection } from 'mongoose';
const defaultLimit = app_constant.defaultLimit
const saltRounds = app_constant.saltRounds

const setOptions = async (pagination: any, limit: any) => {
    try {

        let options: any = {
            lean: true,
            sort: { _id: -1 }
        }

        if (pagination == undefined && typeof limit != undefined) {
            options = {
                lean: true,
                limit: parseInt(limit),
                sort: { _id: -1 }
            }
        }
        else if (typeof pagination != undefined && limit == undefined) {
            options = {
                lean: true,
                skip: parseInt(pagination) * defaultLimit,
                limit: defaultLimit,
                sort: { _id: -1 }
            }
        }

        else if (typeof pagination != undefined && typeof limit != undefined) {
            options = {
                lean: true,
                skip: parseInt(pagination) * parseInt(limit),
                limit: parseInt(limit),
                sort: { _id: -1 }
            }
        }

        return options

    }
    catch (err) {
        throw err;
    }
}

const GenerateOtp = async () => {
    try {

        let static_otp = 1234
        let options = {
            length: 4,
            charset: '123456789'
        }
        let code = random_string.generate(options)
        let otp = `${static_otp}`
        return otp

    }
    catch (err) {
        throw err;
    }
}

const generateGroupLink = async (name:any) => {
    try {

        let static_link = "https://shadowz.com/chatroom/"
        let options = {
            length: 7,
            charset: 'alphanumeric'
        }
        let code = name
        let link = `${static_link}${code}`
        return link

    }
    catch (err) {
        throw err;
    }
}

const genUniqueCode = async (collection: any) => {
    try {

        let options = {
            length: 7,
            charset: 'alphanumeric'
        }
        let random_value = random_string.generate(options)

        // fetch users count
        let total_users = await DAO.countData(collection, {})
        let inc_value = Number(total_users) + 1

        // unique code
        let unique_code = `${random_value}${inc_value}`
        return unique_code

    }
    catch (err) {
        throw err;
    }
}



const bcryptPassword = async (password: string) => {
    try {

        const hash = await bcrypt.hashSync(password, saltRounds);
        return hash

    }
    catch (err) {
        throw err;
    }
}

const decryptPassword = async (password: string, hash: string) => {
    try {

        const decryt = await bcrypt.compareSync(password, hash);
        return decryt

    }
    catch (err) {
        throw err;
    }
}

// const genrate_order_id = async () => {
//     try {
//         let static_value = 'ORDER';
//         let options = {
//             length: 4,
//             charset: 'alphanumeric',
//             capitalization: 'uppercase'
//         }
//         let random_value = random_string.generate(options)
//         // fetch ORDERS count
//         let count_orders = await DAO.countData(Models.Orders, {})
//         let unique_id = Number(count_orders) + 1
//         let order_id = `${static_value}${random_value}${unique_id}`
//         return order_id
//     }
//     catch (err) {
//         throw err;
//     }
// }

const genrate_coupon_code = async () => {
    try {
        let static_value = 'COUP';
        let options = {
            length: 6,
            charset: 'alphanumeric',
            capitalization: 'uppercase'
        }
        let random_value = random_string.generate(options)

        let coupon_code = `${static_value}${random_value}`
        return coupon_code
    }
    catch (err) {
        throw err;
    }
}

export {
    setOptions,
    GenerateOtp,
    genUniqueCode,
    bcryptPassword,
    decryptPassword,
    // genrate_order_id,
    genrate_coupon_code,
    generateGroupLink
}