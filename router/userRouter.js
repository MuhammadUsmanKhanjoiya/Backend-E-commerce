import {Registor,adminlogin,login}  from '../controller/userController.js';
import express from 'express';



const router = express.Router();
router.post('/registor', Registor)
router.post('/login',login)
router.post('/admin',adminlogin)


export default router;