const express = require("express")





const controller=require('../controller/upload')

const router= express.Router()





router.post(
    '/',
    controller.upload,
    controller.uploadFile
)



module.express=router