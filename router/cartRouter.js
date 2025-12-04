import {addToCard,updateToCard,getUserCard} from '../controller/cartController.js'
import express from 'express'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/add',authUser,addToCard)
cartRouter.post('/update',authUser,updateToCard)
cartRouter.post('/get',authUser,getUserCard)

export default cartRouter;