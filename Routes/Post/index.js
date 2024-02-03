const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewPost,UploadImage, AddNewPost, UpdatePost, DeletePost, ViewPostByCategory, ViewSinglePost, ViewLimitedPost, ViewPostByIndustry, ViewPostByPrincipal } = require('../../Controllers/Post');
const multer = require("multer")
const path = require('path');
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")


// cloudinary.config({
//     cloud_name: "dz06webjx",
//     api_key: "135655251923377",
//     api_secret: "s_v9qHzcFHS_7ASg9kOD4dgdqMk",
// });

//    const storage = multer.diskStorage({
//      destination: './Public/uploads/PostfeaturedImage',
//      filename: function (req, file, cb) {
//         cb(null,"featuredImage_"+ file.fieldname + '-' + Date.now() + 
//      path.extname(file.originalname));
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"devzox_image",
        format: async ()=> {"png","jpg","svg"},
        public_id: (req,file)=>file.filename
    }
})

const upload = multer({ storage: storage })



// const storagecloud = new multer.memoryStorage();
// const uploadcloud = multer({
//   storagecloud,
// });


// PostViewPost Endpoint
// Route.route("/").get(ViewPost).post([VerifyAdmin,upload.single("fImage")],AddNewPostViewPost);

// Route.route("/:id").patch([VerifyAdmin,upload.single("fImage")],UpdatePostViewPost).delete([VerifyAdmin],DeletePostViewPost)

Route.get("/",ViewPost)
Route.get("/:id",ViewSinglePost)
Route.get("/limited",ViewLimitedPost)
Route.get("/category/:category",ViewPostByCategory)
Route.get("/industry/:category",ViewPostByIndustry)
Route.get("/principal/:category",ViewPostByPrincipal)
Route.post("/",[upload.single("fImage")],AddNewPost);

Route.patch("/:id",[VerifyAdmin,upload.single("fImage")],UpdatePost)
Route.delete("/:id",DeletePost)
Route.post("/contentimage",[VerifyAdmin,upload.single("fImage")],UploadImage)



module.exports = Route;