const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    
    //donde guardamos el archivo
    destination:function (req, file, cb) {
        const pathStorage = path.join(__dirname, "../almacenamiento");
        cb(null, pathStorage);
    },

    // nombre archivo
    filename: function (req, file, cb) {
        
        const extFile = file.originalname.split(".").pop();
        const filename = `usuario-${req.body.username}.${extFile}`;
        cb(null, filename)
        
    }
});

const uploadMiddleware = multer({storage});


module.exports = uploadMiddleware;
