"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO = __importStar(require("../../DAO"));
const Models = __importStar(require("../../models"));
const userServices = __importStar(require("./user.services"));
const email_services = __importStar(require("../../middlewares/email_services"));
const index_1 = require("../../middlewares/index");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = require("dotenv");
const moment_1 = __importDefault(require("moment"));
const age_calculator_1 = require("age-calculator");
dotenv_1.config();
class userController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, display_name, password } = req.body;
                let query_email = { email: email };
                let user_detail = yield userServices.verifyUserInfo(query_email);
                let query_displayName = { display_name: display_name };
                let fetch_data = yield userServices.verifyUserInfo(query_displayName);
                if (user_detail.length) {
                    return res.status(401).json({ message: 'Email already exists' });
                }
                else if (fetch_data.length) {
                    return res.status(403).json({ message: 'Display Name  already exists' });
                }
                else {
                    // create new user
                    let create_user = yield userServices.setUserData(req.body);
                    let { _id } = create_user;
                    console.log("CREate_USER>>");
                    // generate access token
                    let generateToken = yield userServices.Generate_User_Token(_id, req.body);
                    // fetch user response
                    let response = yield userServices.make_user_response(generateToken);
                    // send welcome email to user
                    // await email_services.sendWelcomeMail(create_user);np
                    // return response
                    res.json({ message: "Sign Up Successfully." });
                }
            }
            catch (err) {
                return res.status(400).json({
                    message: "Unable to save in db",
                    error: err
                });
            }
        });
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                let query = { email: email };
                let projection = { __v: 0 };
                let options = { lean: true };
                let fetch_data = yield DAO.getData(Models.Users, query, projection, options);
                if (fetch_data.length) {
                    let { _id, password: hash, status } = fetch_data[0];
                    let decrypt = yield index_1.helpers.decryptPassword(password, hash);
                    if (decrypt != true) {
                        return res.status(400).json({ message: 'Credential Mismatched' });
                    }
                    if (status == 0) {
                        // throw await ("ACCOUNT_DELETED");
                    }
                    if (status == 2) {
                        // throw await ("ACCOUNT_DEACTIVATED");
                    }
                    else {
                        // generate access token
                        let generateToken = yield userServices.Generate_User_Token(_id, req.body);
                        // fetch user response
                        let response = yield userServices.make_user_response(generateToken);
                        // return response
                        res.json({ token: response.token, user: { user_email: email } });
                    }
                }
                else {
                    return res.status(400).json({ message: 'Credential Mismatched' });
                }
            }
            catch (err) {
                return res.status(400).json({
                    message: "Unable to login",
                    error: err
                });
            }
        });
    }
    ;
    static socialLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email } = req.body;
                let query = { email: email };
                let fetchData = yield userServices.verifyUserInfo(query);
                if (fetchData.length) {
                    let password_reset_token = yield index_1.helpers.genUniqueCode(Models.Users);
                    let update = { password_reset_token: password_reset_token, password_reset_time: Date.now() };
                    let options = { new: true };
                    let update_data = yield DAO.findAndUpdate(Models.Users, query, update, options);
                    yield email_services.forgotPasswordMail(update_data);
                    let url = 'http://54.158.4.117/create-password/' + password_reset_token;
                    res.send({ url: url, message: 'Email Send Successfully' });
                }
                else {
                    res.json({ error: 'User Not Found' });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while generating reset password."
                });
            }
        });
    }
    static setNewPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { password_reset_token, password } = req.body;
                let query = { password_reset_token: password_reset_token };
                let fetchData = yield userServices.verifyUserInfo(query);
                if (fetchData.length) {
                    let { email: email } = fetchData[0];
                    let hash = yield index_1.helpers.bcryptPassword(password);
                    let data = {
                        password: hash,
                        password_reset_token: ''
                    };
                    let update_data = yield DAO.findAndUpdate(Models.Users, { email: email }, data, { new: true });
                    res.send({ message: 'Password Changed Successfully.' });
                }
                else {
                    res.json({ error: 'Token Expire or Incorrect' });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating password."
                });
            }
        });
    }
    static accountDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id, token } = req.user_data;
                let query = { _id: _id };
                let update = { status: 0 };
                let options = { new: true };
                let update_data = yield DAO.findAndUpdate(Models.Users, query, update, options);
                let query_delete = { token: token };
                let removeData = yield DAO.removeData(Models.Sessions, query_delete);
                res.json({ message: "Account Deleted Successfully." });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            }
        });
    }
    static accountDeactivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id, token } = req.user_data;
                let query = { _id: _id };
                let update = { status: 2 };
                let options = { new: true };
                let update_data = yield DAO.findAndUpdate(Models.Users, query, update, options);
                query;
                res.json({ message: "Account De-Active Successfully." });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            }
        });
    }
    static accountActivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id, token } = req.user_data;
                let query = { _id: _id };
                let update = { status: 1 };
                let options = { new: true };
                let update_data = yield DAO.findAndUpdate(Models.Users, query, update, options);
                res.json({ message: "Account Active Successfully." });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.session_data;
                let query = { _id: _id };
                yield DAO.removeMany(Models.Sessions, query);
                let message = "Logout Sucessfull";
                let response = { message: message };
                // return response
                index_1.handleSuccess(res, response);
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            }
        });
    }
    ;
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.user_data;
                let query = { _id: _id };
                let projection = { __v: 0 };
                let options = { lean: true };
                let response = yield DAO.getSingleData(Models.Users, query, projection, options);
                return res.json(response);
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            }
        });
    }
    static personalInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let { first_name, last_name, eyes_other, hair_color_other, ethinicity_other, dob, gender, interested_in, height, eyes, hair_color, interests } = req.body;
                let query = { _id: user_id };
                let set_data = {};
                if (first_name) {
                    set_data.first_name = first_name;
                }
                if (last_name) {
                    set_data.last_name = last_name;
                }
                if (dob) {
                    set_data.dob = dob;
                }
                if (gender) {
                    set_data.gender = gender;
                }
                if (interested_in) {
                    set_data.interested_in = interested_in;
                }
                if (height) {
                    set_data.height = height;
                }
                if (eyes) {
                    set_data.eyes = eyes;
                }
                if (eyes_other) {
                    set_data.eyes_other = eyes_other;
                }
                if (hair_color) {
                    set_data.hair_color = hair_color;
                }
                if (interests) {
                    set_data.interests = interests;
                }
                if (hair_color_other) {
                    set_data.hair_color_other = hair_color_other;
                }
                let options = { new: true };
                let response = yield DAO.findAndUpdate(Models.Users, query, set_data, options);
                return res.json(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static personalPrefrences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let { alcohol, smoking, marital_status_other, marital_status, politics_other, looking_other, ethinicity_other, marijuana, drugs, have_kids, want_kids, astrology_sign, ethinicity, looking_for, religion, politics } = req.body;
                let query = { _id: user_id };
                let set_data = {};
                if (alcohol) {
                    set_data.alcohol = alcohol;
                }
                if (smoking) {
                    set_data.smoking = smoking;
                }
                if (marijuana) {
                    set_data.marijuana = marijuana;
                }
                if (drugs) {
                    set_data.drugs = drugs;
                }
                if (have_kids) {
                    set_data.have_kids = have_kids;
                }
                if (want_kids) {
                    set_data.want_kids = want_kids;
                }
                if (astrology_sign) {
                    set_data.astrology_sign = astrology_sign;
                }
                if (ethinicity) {
                    set_data.ethinicity = ethinicity;
                }
                if (ethinicity_other) {
                    set_data.ethinicity_other = ethinicity_other;
                }
                if (looking_for) {
                    set_data.looking_for = looking_for;
                }
                if (religion) {
                    set_data.religion = religion;
                }
                if (politics) {
                    set_data.politics = politics;
                }
                if (politics_other) {
                    set_data.politics_other = politics_other;
                }
                if (looking_other) {
                    set_data.looking_other = looking_other;
                }
                if (marital_status) {
                    set_data.marital_status = marital_status;
                }
                if (marital_status_other) {
                    set_data.marital_status_other = marital_status_other;
                }
                let options = { new: true };
                let response = yield DAO.findAndUpdate(Models.Users, query, set_data, options);
                return res.json(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static professinalInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let { have_car, work, education_degree, work_position, work_employer, education_school, about_me } = req.body;
                let query = { _id: user_id };
                let set_data = {};
                if (have_car) {
                    set_data.have_car = have_car;
                }
                if (work_position) {
                    set_data.work_position = work_position;
                }
                if (work_employer) {
                    set_data.work_employer = work_employer;
                }
                if (education_degree) {
                    set_data.education_degree = education_degree;
                }
                if (education_school) {
                    set_data.education_school = education_school;
                }
                if (about_me) {
                    set_data.about_me = about_me;
                }
                let options = { new: true };
                let response = yield DAO.findAndUpdate(Models.Users, query, set_data, options);
                return res.json(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static locationInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let { location, latLng, mobile, country, state, city, zipcode } = req.body;
                let query = { _id: user_id };
                let set_data = {};
                console.log("loc", location),
                    console.log("mob", mobile);
                if (location) {
                    set_data.location = location;
                }
                if (latLng) {
                    set_data.latLng = latLng;
                }
                if (mobile) {
                    set_data.mobile = mobile;
                }
                if (country) {
                    set_data.country = country;
                }
                if (state) {
                    set_data.state = state;
                }
                if (city) {
                    set_data.city = city;
                }
                if (zipcode) {
                    set_data.zipcode = zipcode;
                }
                let options = { new: true };
                let response = yield DAO.findAndUpdate(Models.Users, query, set_data, options);
                return res.json(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static profileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { file: { name, data, mimetype } } = req.files;
                let { _id: user_id } = req.user_data;
                // console.log("FILES",req.files)
                console.log("image", name);
                console.log("Buffer", data);
                let file_name = yield userServices.generate_file_name(name);
                console.log("file_name--", file_name);
                let params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: file_name,
                    ACL: 'public-read',
                    Body: data,
                    ContentType: mimetype
                };
                //Uploading files to the bucket
                const stored = yield userServices.upload_file_to_spaces(params);
                //    let saveData= await Models.Users.updateOne(
                //         { _id: req.user._id },
                //         { $push: { images: file_name } }
                //     )
                //     console.log("save_data",saveData)
                let query = { _id: user_id };
                let projection = { __v: 0 };
                let options = { lean: true };
                let getUser = yield DAO.getData(Models.Users, query, projection, options);
                let { images } = getUser[0];
                images.push(file_name);
                let update = { images: images };
                let update_data = yield DAO.findAndUpdate(Models.Users, query, update, { new: true });
                console.log("update_data", update_data);
                return res.json({ message: 'File uploaded successfully.' });
            }
            catch (err) {
                return res.status(400).json({ message: 'Error Occur While uploading.', error: err });
            }
        });
    }
    static profileImageDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let key = req.params.key;
                const s3 = new aws_sdk_1.default.S3({
                    accessKeyId: process.env.AWS_ID,
                    secretAccessKey: process.env.AWS_SECRET
                });
                var params = { Bucket: process.env.AWS_BUCKET_NAME, Key: key };
                const stored = yield userServices.delete_file_from_spaces(params);
                let user = yield Models.Users.findOne({ _id: req.user._id });
                let image = user.images;
                image = image.filter(item => item !== key);
                let data = {
                    images: image
                };
                yield Models.Users.findOneAndUpdate({ _id: req.user._id }, { $set: data }, { new: true }, (err, location) => {
                    if (err) {
                        return res.status(404).json({
                            error: err
                        });
                    }
                    if (location === null) {
                        return res.status(404).json({
                            message: "No Data Found"
                        });
                    }
                });
                return res.json({ message: 'File deleted successfully.' });
            }
            catch (err) {
                return res.status(400).json({ message: 'Error Occur While uploading.', error: err });
            }
        });
    }
    static imagePosition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { images } = req.body;
                let { _id: user_id } = req.user_data;
                let query = { _id: user_id };
                let options = { new: true };
                let data = {
                    images: images
                };
                let response = yield DAO.findAndUpdate(Models.Users, query, data, options);
                return res.json({ message: 'Image Position Change Successfully.' });
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static matchingAlgorithm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let fetchUser = yield userServices.verifyUserInfo({ _id: user_id });
                let { latLng, country, dob, interested_in, gender } = fetchUser[0];
                console.log('gender', gender);
                let longitude = latLng.coordinates[0];
                let latitude = latLng.coordinates[1];
                let userage = new age_calculator_1.AgeFromDateString(dob).age;
                console.log("userAGe----", userage);
                let greater = userage + 3;
                let lesser = userage - 3;
                let greaterAge = moment_1.default().subtract(greater, 'years').toISOString();
                let lesserAge = moment_1.default().subtract(lesser, 'years').toISOString();
                let checkAge = moment_1.default().subtract(18, 'years').toISOString();
                console.log("AGE---CHECK", checkAge);
                // let light_id_Arr:any =[]
                // let query_red ={user:user_id,light:"Red"}
                // let getRedLight:any = await DAO.getData(Models.Light,query_red,{__v:0},{lean:true})
                // console.log("REDLIGHT",getRedLight)
                // for(let i of getRedLight){
                //     light_id_Arr.push(i.sent)
                // }
                // let query_yellow ={user:user_id,light:"Yellow"}
                // let getYellowLight:any = await DAO.getData(Models.Light,query_yellow,{__v:0},{lean:true})
                // console.log("YellowLihgt",getYellowLight)
                // for(let i of getYellowLight){
                //     light_id_Arr.push(i.sent)
                //     }
                // console.log("LIGHT_IDS",light_id_Arr)
                // console.log("INT",interested_in)
                // let query_green ={user:user_id,light:"Green"}
                // let getGreenLight:any = await DAO.getData(Models.Light,query_green,{__v:0},{lean:true})
                // let greenLightArr:any =[]
                // for(let i of getGreenLight){
                //     greenLightArr.push(i.sent)
                // }
                let query_All = { user: user_id };
                let getAll = yield DAO.getData(Models.Light, query_All, { __v: 0 }, { lean: true });
                let allArr = [];
                for (let i of getAll) {
                    allArr.push(i.sent);
                }
                console.log("sdfsf", allArr);
                let query = {
                    interested_in: { $eq: gender },
                    gender: { $in: interested_in },
                    _id: { $nin: allArr },
                    $or: [
                        { _id: { $ne: user_id }, },
                        // { _id:{$in:light_id_Arr}},
                        // { _id:{$nin:greenLightArr}},
                        // {},
                        { dob: { $gte: greaterAge } },
                        { dob: { $lte: checkAge } },
                        { dob: { $lte: lesserAge } },
                    ],
                    latLng: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    },
                    country: country
                };
                let response = yield DAO.getData(Models.Users, query, { __v: 0 }, { lean: true });
                console.log("LENGTH", response.length);
                index_1.handleSuccess(res, response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static searchMatchingAlgorithm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { interested_in, age_from, age_to, height_from, height_to, eyes, hair_color, religion, marital_status } = req.body, { _id: user_id } = req.user_data;
                let fetchUser = yield userServices.verifyUserInfo({ _id: user_id });
                let { latLng, country, gender } = fetchUser[0];
                let longitude = latLng.coordinates[0];
                let latitude = latLng.coordinates[1];
                let greater = age_to;
                let lesser = age_from;
                let greaterAge = moment_1.default().subtract(greater, 'years').toISOString();
                let lesserAge = moment_1.default().subtract(lesser, 'years').toISOString();
                let checkAge = moment_1.default().subtract(18, 'years').toISOString();
                console.log("AGE---CHECK", checkAge);
                let light_id_Arr = [];
                let query_red = { user: user_id, light: "Red" };
                let getRedLight = yield DAO.getData(Models.Light, query_red, { __v: 0 }, { lean: true });
                console.log("REDLIGHT", getRedLight);
                for (let i of getRedLight) {
                    light_id_Arr.push(i.sent);
                }
                let query_yellow = { user: user_id, light: "Yellow" };
                let getYellowLight = yield DAO.getData(Models.Light, query_yellow, { __v: 0 }, { lean: true });
                console.log("YellowLihgt", getYellowLight);
                for (let i of getYellowLight) {
                    light_id_Arr.push(i.sent);
                }
                console.log("LIGHT_IDS", light_id_Arr);
                console.log("INT", interested_in);
                let query = {
                    interested_in: { $eq: gender },
                    gender: { $in: interested_in },
                    $and: [
                        { _id: { $ne: user_id } },
                        { _id: { $in: light_id_Arr } },
                        { dob: { $gte: greaterAge } },
                        { dob: { $lte: checkAge } },
                        { dob: { $lte: lesserAge } },
                    ],
                    latLng: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    },
                    $or: [
                        { 'eyes': eyes },
                        { 'hair_color': hair_color },
                        { 'religion': religion },
                    ]
                    // country:country
                };
                let response = yield DAO.getData(Models.Users, query, { __v: 0 }, { lean: true });
                console.log("LENGTH", response.length);
                index_1.handleSuccess(res, response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static saveLight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let { sent, light } = req.body;
                let query = { user: user_id, sent: sent };
                let projection = { __v: 0 };
                let options = { lean: true };
                let fetch_data = yield DAO.getData(Models.Light, query, projection, options);
                if (fetch_data.length) {
                    let query = { user: user_id, sent: sent };
                    let update = { light: light };
                    let options = { new: true };
                    let update_data = yield DAO.findAndUpdate(Models.Light, query, update, options);
                    console.log("Update data ", update_data);
                    return res.json({ 'message': 'Light Sent Successfully' });
                }
                else {
                    let data = {
                        user: user_id,
                        sent: sent,
                        light: light
                    };
                    let save_data = yield DAO.saveData(Models.Light, data);
                    console.log("Update save_data ", save_data);
                    return res.json({ 'message': 'Light Sent Successfully' });
                }
                // return res.json({'message' : 'Already Light Send.'})
            }
            catch (err) {
                return res.status(400).json({
                    message: err
                });
            }
        });
    }
    static yellowLight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                console.log("user_ifd", user_id);
                let query = { user: user_id, light: "Yellow" };
                let projection = { __v: 0 };
                let options = { lean: true };
                let polulate_data = [
                    { path: 'sent', select: "" }
                ];
                let response = yield DAO.populateData(Models.Light, query, projection, options, polulate_data);
                console.log("sdfds", response);
                res.send(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static greenLight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let query = {
                    // $and:[
                    user: user_id, light: "Green"
                    // {,light:{$ne:"Green"}}
                    // ]
                };
                let projection = { __v: 0 };
                let options = { lean: true };
                let fetchData = yield DAO.getData(Models.Light, query, projection, options);
                let sent_ids_arr = [];
                for (let i of fetchData) {
                    sent_ids_arr.push(i.sent);
                }
                console.log("sent arrr", sent_ids_arr);
                let query_one = {
                    user: { $in: sent_ids_arr }, light: "Green", sent: user_id
                };
                let fetchDataOne = yield DAO.getData(Models.Light, query_one, projection, options);
                let other_ids_arr = [];
                console.log("giug", other_ids_arr);
                for (let i of fetchDataOne) {
                    other_ids_arr.push(i.user);
                }
                let response;
                // if(other_ids_arr.length){
                let query_resp = {
                    user: user_id, sent: { $nin: other_ids_arr }, light: "Green"
                };
                let populate_data = [
                    { path: "sent", select: "" }
                ];
                response = yield DAO.populateData(Models.Light, query_resp, projection, options, populate_data);
                // }else{
                //     let query_resp = {
                //         user:user_id,sent:{$nin:sent_ids_arr},light:"Green"
                //     }
                //     let populate_data =[
                //         {path:"sent", select:""}
                //     ]
                //      response = await DAO.populateData(Models.Light,query_resp,projection,options,populate_data)
                // }
                res.send(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
    static mutualGreenLight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: user_id } = req.user_data;
                let query = {
                    user: user_id,
                    light: "Green"
                };
                let projection = { __v: 0 };
                let options = { lean: true };
                let fetchData = yield DAO.getData(Models.Light, query, projection, options);
                let sent_ids_arr = [];
                for (let i of fetchData) {
                    sent_ids_arr.push(i.sent);
                }
                let query_resp = {
                    user: { $in: sent_ids_arr }, sent: user_id, light: "Green"
                };
                let populate_data = [
                    { path: "user", select: '' }
                ];
                let response = yield DAO.populateData(Models.Light, query_resp, projection, options, populate_data);
                res.send(response);
            }
            catch (err) {
                index_1.handleCatch(res, err);
            }
        });
    }
}
exports.default = userController;
