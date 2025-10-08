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
import { AddOrder } from './controllar/orderControllar/addorders'
import {dashboardCard} from './controllar/DashboardCard/dashboardCard'
import { getProductsAnalytics } from './controllar/DashboardCard/salesAnalytics'
import { LatestOrderList } from './controllar/DashboardCard/latestOrderList'
import { ProductsList } from './controllar/DashboardCard/productsList'
import { ProductUpdateById } from './controllar/DashboardCard/productsUpdate'
import { ProductsDeleteById } from './controllar/DashboardCard/productsDeletedById'

import { Orders } from './controllar/DashboardCard/orders'
import { PaymentStatusUpdate } from './controllar/DashboardCard/PaymentsStatus'
import { ReportCard } from './controllar/DashboardCard/reportCard'
import { AllUserList } from './controllar/DashboardCard/User/userList'
import { UserUpdateById } from './controllar/DashboardCard/User/userUpdateById'
import { UserDeleteByid } from './controllar/DashboardCard/User/userDeleteById'
import { UserOrders } from './controllar/UserOrdersControllar/userOrders'
import { UserOrderscancelById } from './controllar/UserOrdersControllar/userOrderCancelById'
import { BlogsPost } from './controllar/BlogsControllar/blogsPost'
import { GetAllBlogs } from './controllar/BlogsControllar/getBlogsData'





dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

dbConnection()

//POST
app.post('/create/user', createUser);
app.post('/login', loginUser);
app.post('/order', asyncHandler(AddOrder));
// payment api
app.post('/create-payment-intent', asyncHandler(CreatePaymentIntent) );
app.post('/blog', asyncHandler(BlogsPost))
app.get('/checkout/:id', asyncHandler(Checkout));
//admin
app.post('/admin/add-products', asyncHandler(addProducts));

//GET
app.get('/get-random-products', asyncHandler(getRandomProducts));
app.get('/shopping', asyncHandler(getAllProducts));
app.get('/user-orders', asyncHandler(UserOrders));
app.get('/blogs', asyncHandler(GetAllBlogs))
//admin
app.get('/admin/dashboard/card', asyncHandler(dashboardCard));
app.get('/admin/sales/analytics', asyncHandler(getProductsAnalytics));
app.get('/admin/latest/order', asyncHandler(LatestOrderList));
app.get('/admin/products/list',asyncHandler(ProductsList));
app.get('/admin/order', asyncHandler(Orders));
app.get('/admin/report', asyncHandler(ReportCard));
app.get('/admin/user-list', asyncHandler(AllUserList))


//DELETE

app.delete('/admin/products/:id', asyncHandler(ProductsDeleteById));
app.delete('/admin/user-delete/:id', asyncHandler(UserDeleteByid));
app.delete('/user/order/:id', asyncHandler(UserOrderscancelById))

//PATCH
app.patch('/products', asyncHandler(ProductUpdateById));
app.patch('/admin/orders/payment-status', asyncHandler(PaymentStatusUpdate));
app.patch('/admin/user-update/:id', asyncHandler(UserUpdateById))
//PUT

app.use(errorhandler)
app.listen(5000, () => {
  console.log('server is running on port 5000')
})
