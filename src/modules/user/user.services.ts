import * as DAO from "../../DAO";
import mongoose from "mongoose";
import * as Models from "../../models";
import { app_constant } from "../../config/index";
import { generateToken, handleCustomError, helpers, } from "../../middlewares/index";
import * as email_services from "../../middlewares/email_services";
import moment from "moment"
const user_scope = app_constant.scope.user;



const Generate_User_Token = async (_id: string, req_data: any) => {
  try {
    let token_data = {
      _id: _id,
      scope: user_scope,
      collection: Models.Users,
      token_gen_at: +new Date(),
    };
    let access_token: any = await generateToken(token_data);
    let response = await save_session_data(access_token, token_data, req_data);
    // console.log(response)
    return response;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};







const save_session_data = async (
  token: string,
  token_data: any,
  req_data: any
) => {
  try {
    let { _id: user_id, token_gen_at } = token_data
    let set_data: any = {
      type: "USER",
      user_id: user_id,
      token: token,
      token_gen_at: token_gen_at,
      created_at: +new Date(),
    };
  
    let response = await DAO.saveData(Models.Sessions, set_data);

    return response;
  } catch (err) {
    throw err;
  }
};

const make_user_response = async (token_data: any) => {
  try {
    let { user_id, token, device_type, fcm_token, token_gen_at } =
      token_data;

    let query = { _id: user_id };
    let projection = { __v: 0, password: 0, otp: 0 };
    let options = { lean: true };
    let response: any = await DAO.getData(
      Models.Users, query, projection, options);

    if (response.length) {
      response[0].token = token;
      response[0].device_type = device_type;
      response[0].fcm_token = fcm_token;
      response[0].token_gen_at = token_gen_at;
      return response[0];
    } else {
      throw await ("INVALID_OBJECT_ID");
    }
  } catch (err) {
    throw err;
  }
};


const verifyUserInfo = async (query: any) => {
  try {
    let projection = { __v: 0 };
    let options = { lean: true };
    let fetch_data = await DAO.getData(Models.Users, query, projection, options);
    console.log(fetch_data);
    return fetch_data;
  } catch (err) {
    throw err;
  }
};

const setUserData = async (data: any) => {
  try {
    let { dob, display_name,interested_in,country,email, password ,gender,state,city,zipcode,latLng} = data;

    // bycryt password
    let hassed_password = await helpers.bcryptPassword(password);
  
    let otp = await helpers.GenerateOtp()
    let data_to_save: any = {
      password : hassed_password,
      dob : dob,
      display_name : display_name,
      email : email,
      gender : gender,
      interested_in : interested_in,
      country : country,
      state : state,
      city : city,
      zipcode : zipcode,
      latLng : latLng,
      otp:otp
    };
    console.log("DATA-to save",data_to_save)
    let response: any = await DAO.saveData(Models.Users, data_to_save);
    console.log("resp,",response)
    return response;
  } catch (err) {
    throw err;
  }
};

const createNewUser = async (data: any) => {
  try {
    let { social_type, social_token, country_code, phone_no, name, email } =
      data;

    let data_to_save: any = {
      social_type: social_type,
      social_token: social_token,
      email_verified: true,
      created_at: +new Date(),
    };
    if (email != null || email != undefined) {
      data_to_save.email = email;
    }
    if (country_code != null || country_code != undefined) {
      data_to_save.country_code = country_code;
    }
    if (phone_no != null || phone_no != undefined) {
      data_to_save.phone_no = phone_no;
    }
    if (name != null || email != undefined) {
      data_to_save.name = name;
    }

    let response = await DAO.saveData(Models.Users, data_to_save);
    return response;
  } catch (err) {
    throw err;
  }
};

const random_code=async(length:number)=> {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generate_file_name = async (file_name: string) => {
  try {

      // console.log("<--file_name-->", file_name)

      let current_millis = moment().format('x')
      let raw_file_name = file_name.split(/\s/).join('');
      let split_file = raw_file_name.split('.')

      // spiting by all special charcters
      let split_all = split_file[0].split(/[^a-zA-Z0-9]/g).join('_')

      let name = split_all.toLowerCase()
      let ext = split_file[1]

      // console.log("<--name-->", name)
      // console.log("<--ext-->", ext)
      

      let gen_file_name = `${name}_${current_millis}.${ext}`

      // console.log("<--gen_file_name-->", gen_file_name)

      return gen_file_name.toLowerCase()

  }
  catch (err) {
      throw err;
  }
}

export {
  Generate_User_Token,
  save_session_data,
  make_user_response,
  verifyUserInfo,
  setUserData,
  createNewUser,
  random_code,
  generate_file_name
 
};
