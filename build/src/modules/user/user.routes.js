"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const authenticator_1 = __importDefault(require("../../middlewares/authenticator"));
const router = express_1.default.Router();
var multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/sign-up", user_controller_1.default.signUp);
router.post("/sign-in", user_controller_1.default.signIn);
router.post("/forget-password", user_controller_1.default.forgetPassword);
router.post("/change-password", user_controller_1.default.setNewPassword);
router.post("/account-delete", authenticator_1.default, user_controller_1.default.accountDelete);
router.post("/account-deactivate", authenticator_1.default, user_controller_1.default.accountDeactivate);
router.post("/account-activate", authenticator_1.default, user_controller_1.default.accountActivate);
router.post("/logout", authenticator_1.default, user_controller_1.default.logout);
//PROFILE APIS
router.get("/get-profile", authenticator_1.default, user_controller_1.default.getProfile);
router.post("/personal-information", authenticator_1.default, user_controller_1.default.personalInformation);
router.post("/personal-preferences", authenticator_1.default, user_controller_1.default.personalPrefrences);
router.post("/professional-information", authenticator_1.default, user_controller_1.default.professinalInformation);
router.post("/location-information", authenticator_1.default, user_controller_1.default.locationInformation);
router.post("/profile-image", upload.fields([{ name: 'image', maxCount: 1 }]), authenticator_1.default, user_controller_1.default.profileImage);
router.post("/profile-image-delete/:key", authenticator_1.default, user_controller_1.default.profileImageDelete);
router.post("/image-position", authenticator_1.default, user_controller_1.default.imagePosition);
router.post("/matching-algo", authenticator_1.default, user_controller_1.default.matchingAlgorithm);
router.post("/search-matching-algo", authenticator_1.default, user_controller_1.default.searchMatchingAlgorithm);
//Light APIS
router.post("/save-light", authenticator_1.default, user_controller_1.default.saveLight);
router.get("/yellow-light", authenticator_1.default, user_controller_1.default.yellowLight);
router.get("/sent-green-light", authenticator_1.default, user_controller_1.default.greenLight);
router.get("/mutual-green-light", authenticator_1.default, user_controller_1.default.mutualGreenLight);
exports.default = router;
