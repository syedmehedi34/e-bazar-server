import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './database/dbConnection'
import { createUser } from './controllar/userController/createUser'
import { loginUser } from './controllar/userController/userLogin'
import { addProducts } from './controllar/productsControllar/add-products'
import errorhandler from './middleware/errorHandler'
import asyncHandler from './middleware/asyncHandler'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

dbConnection()

//POST
app.post('/create/user', createUser)
app.post('/login', loginUser)
//admin
app.post('/admin/add-products', asyncHandler(addProducts))

//GET

//DELETE

//PATCH

//PUT

app.use(errorhandler)
app.listen(5000, () => {
  console.log('server is running on port 5000')
})
