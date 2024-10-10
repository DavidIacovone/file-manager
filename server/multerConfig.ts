import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/app/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
});

export default storage;