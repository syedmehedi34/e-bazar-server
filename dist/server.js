"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = require("./database/dbConnection");
const createUser_1 = require("./controllar/userController/createUser");
const userLogin_1 = require("./controllar/userController/userLogin");
const add_products_1 = require("./controllar/productsControllar/add-products");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const asyncHandler_1 = __importDefault(require("./middleware/asyncHandler"));
const getRandomProducts_1 = require("./controllar/productsControllar/getRandomProducts");
const getAllProducts_1 = require("./controllar/getAllProducts/getAllProducts");
const checkout_1 = require("./controllar/checkoutControllar/checkout");
const payment_1 = require("./controllar/paymentControllar/payment");
const addorders_1 = require("./controllar/orderControllar/addorders");
const dashboardCard_1 = require("./controllar/DashboardCard/dashboardCard");
const salesAnalytics_1 = require("./controllar/DashboardCard/salesAnalytics");
const latestOrderList_1 = require("./controllar/DashboardCard/latestOrderList");
const productsList_1 = require("./controllar/DashboardCard/productsList");
const productsUpdate_1 = require("./controllar/DashboardCard/productsUpdate");
const productsDeletedById_1 = require("./controllar/DashboardCard/productsDeletedById");
const orders_1 = require("./controllar/DashboardCard/orders");
const PaymentsStatus_1 = require("./controllar/DashboardCard/PaymentsStatus");
const reportCard_1 = require("./controllar/DashboardCard/reportCard");
const userList_1 = require("./controllar/DashboardCard/User/userList");
const userUpdateById_1 = require("./controllar/DashboardCard/User/userUpdateById");
const userDeleteById_1 = require("./controllar/DashboardCard/User/userDeleteById");
const userOrders_1 = require("./controllar/UserOrdersControllar/userOrders");
const userOrderCancelById_1 = require("./controllar/UserOrdersControllar/userOrderCancelById");
const blogsPost_1 = require("./controllar/BlogsControllar/blogsPost");
const getBlogsData_1 = require("./controllar/BlogsControllar/getBlogsData");
const userOrderById_1 = require("./controllar/UserOrdersControllar/userOrderById");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', "https://e-bazaar-client.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, dbConnection_1.dbConnection)();
//POST
app.post('/create/user', createUser_1.createUser);
app.post('/login', userLogin_1.loginUser);
app.post('/order', (0, asyncHandler_1.default)(addorders_1.AddOrder));
// payment api
app.post('/create-payment-intent', (0, asyncHandler_1.default)(payment_1.CreatePaymentIntent));
app.post('/blog', (0, asyncHandler_1.default)(blogsPost_1.BlogsPost));
app.get('/checkout/:id', (0, asyncHandler_1.default)(checkout_1.Checkout));
//admin
app.post('/admin/add-products', (0, asyncHandler_1.default)(add_products_1.addProducts));
//GET
app.get('/get-random-products', (0, asyncHandler_1.default)(getRandomProducts_1.getRandomProducts));
app.get('/shopping', (0, asyncHandler_1.default)(getAllProducts_1.getAllProducts));
app.get('/user-orders', (0, asyncHandler_1.default)(userOrders_1.UserOrders));
app.get('/blogs', (0, asyncHandler_1.default)(getBlogsData_1.GetAllBlogs));
app.get('/user/order/:id', (0, asyncHandler_1.default)(userOrderById_1.UserOrderById));
//admin
app.get('/admin/dashboard/card', (0, asyncHandler_1.default)(dashboardCard_1.dashboardCard));
app.get('/admin/sales/analytics', (0, asyncHandler_1.default)(salesAnalytics_1.getProductsAnalytics));
app.get('/admin/latest/order', (0, asyncHandler_1.default)(latestOrderList_1.LatestOrderList));
app.get('/admin/products/list', (0, asyncHandler_1.default)(productsList_1.ProductsList));
app.get('/admin/order', (0, asyncHandler_1.default)(orders_1.Orders));
app.get('/admin/report', (0, asyncHandler_1.default)(reportCard_1.ReportCard));
app.get('/admin/user-list', (0, asyncHandler_1.default)(userList_1.AllUserList));
//DELETE
app.delete('/admin/products/:id', (0, asyncHandler_1.default)(productsDeletedById_1.ProductsDeleteById));
app.delete('/admin/user-delete/:id', (0, asyncHandler_1.default)(userDeleteById_1.UserDeleteByid));
app.delete('/user/order/:id', (0, asyncHandler_1.default)(userOrderCancelById_1.UserOrderscancelById));
//PATCH
app.patch('/products', (0, asyncHandler_1.default)(productsUpdate_1.ProductUpdateById));
app.patch('/admin/orders/payment-status', (0, asyncHandler_1.default)(PaymentsStatus_1.PaymentStatusUpdate));
app.patch('/admin/user-update/:id', (0, asyncHandler_1.default)(userUpdateById_1.UserUpdateById));
//PUT
app.use(errorHandler_1.default);
app.listen(5000, () => {
    console.log('server is running on port 5000');
});
