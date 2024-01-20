const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/userController");
const upload = require("../multerconfig/storageconfig");


// routes
router.post(
  "/user/register", //we'll check if this works with postman
  upload.single("user_profile"),
  controllers.userpost
); //"user_profile" is same name from frontend

router.get("/user/details", controllers.userget);
router.get("/user/:id",controllers.singleuserget);
router.put("/user/edit/:id",upload.single("user_profile"),controllers.useredit)
router.delete("/user/delete/:id",controllers.userdelete)
router.put("/user/status/:id",controllers.userstatus)
router.get("/userexport",controllers.userExport) //csv

module.exports = router;
