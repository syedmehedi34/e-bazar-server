import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './database/dbConnection'
import { createUser } from './controllar/userController/createUser'
import { loginUser } from './controllar/userController/userLogin'
import { addProducts } from './controllar/productsControllar/add-products'
import errorhandler from './middleware/errorHandler'
import asyncHandler from './middleware/asyncHandler'
import { getRandomProducts } from './controllar/productsControllar/getRandomProducts'
import { getAllProducts } from './controllar/getAllProducts/getAllProducts'
import { Checkout } from './controllar/checkoutControllar/checkout'
import { CreatePaymentIntent } from './controllar/paymentControllar/payment'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

dbConnection()

//POST
app.post('/create/user', createUser)
app.post('/login', loginUser)
// payment api
app.post('/create-payment-intent', asyncHandler(CreatePaymentIntent) )

app.get('/checkout/:id', asyncHandler(Checkout))
//admin
app.post('/admin/add-products', asyncHandler(addProducts))

//GET
//admin
app.get('/get-random-products', asyncHandler(getRandomProducts))
app.get('/shopping', asyncHandler(getAllProducts))
//DELETE

//PATCH

//PUT

app.use(errorhandler)
app.listen(5000, () => {
  console.log('server is running on port 5000')
})
