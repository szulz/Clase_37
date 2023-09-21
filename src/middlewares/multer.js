const multer = require('multer')
const path = require('path');
const { SERVER_URL } = require('../config/env.config');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '/public'),
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploader = multer({ storage })

module.exports = uploader