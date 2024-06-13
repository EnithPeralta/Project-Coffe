const multer=require('multer')

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb,(null,'uploads')   //guarda todos los archivos en una carpeta uploads
    },
    filename:function(req, file, cb){
        cb(null,`${Date.now()}-${file.originalname}`) //pone el nombre delarchivo y el tiempo (previene reemplazar archivos del mismo nombre)
    }
})

const upload = multer({storage: storage})

exports.upload = upload.single('myfile')



exports.uploadFile=(req, res)=>{
    res.send({data: 'Enviar un archivo'})
}