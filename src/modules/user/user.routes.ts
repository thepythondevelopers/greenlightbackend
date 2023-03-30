import express from 'express';
import  userController from './user.controller';
import authenticator from "../../middlewares/authenticator"
const router = express.Router();
var multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/sign-up",userController.signUp)
router.post("/sign-in",userController.signIn)

router.post("/forget-password",userController.forgetPassword)
router.post("/change-password",userController.setNewPassword)

router.post("/account-delete",authenticator, userController.accountDelete)
router.post("/account-deactivate",authenticator,userController.accountDeactivate)
router.post("/account-activate",authenticator,userController.accountActivate)
router.post("/logout",authenticator,userController.logout)

//PROFILE APIS
router.get("/get-profile",authenticator,userController.getProfile)
router.post("/personal-information",authenticator,userController.personalInformation)
router.post("/personal-preferences",authenticator,userController.personalPrefrences)
router.post("/professional-information",authenticator,userController.professinalInformation)
router.post("/location-information",authenticator,userController.locationInformation)
router.post("/profile-image",authenticator,userController.profileImage)
router.post("/profile-image-delete/:key",authenticator,userController.profileImageDelete);
router.post("/image-position",authenticator,userController.imagePosition);
router.post("/matching-algo",authenticator,userController.matchingAlgorithm)
router.post("/search-matching-algo",authenticator,userController.searchMatchingAlgorithm)

//Light APIS
router.post("/save-light",authenticator,userController.saveLight)
router.get("/yellow-light",authenticator,userController.yellowLight)
router.get("/sent-green-light",authenticator,userController.greenLight);
router.get("/mutual-green-light",authenticator,userController.mutualGreenLight);


export default router;