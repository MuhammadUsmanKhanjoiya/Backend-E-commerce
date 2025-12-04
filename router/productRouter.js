import express from 'express';
import {AddProduct,RemoveProduct,Singleproduct,ListProduct} from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/AdminAuth.js';



const router = express.Router();

router.post("/add",adminAuth,upload.fields([{name:"image1", maxCount:1},{name:"image2", maxCount:1},{name:"image3", maxCount:1},{name:"image4", maxCount:1}]), AddProduct);
router.delete('/remove',adminAuth, RemoveProduct)
router.post('/single',Singleproduct)
router.get('/list',ListProduct)


export default router;