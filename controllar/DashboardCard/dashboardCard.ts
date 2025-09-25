import { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel"
import ProductsModel from '../../model/productsModel/productsModel';
import userModel from '../../model/UserModel/userModel';
export const dashboardCard = async (req: Request, res: Response) => {
  try {

    const [totalSalesResult, totalUsers, totalProducts, totalOrders] =
      await Promise.all([
        Order.aggregate([
          { $match: { "payment.paymentStatus": "pending" } },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$product.totalPrice" },
            },
          },
        ]),
        userModel.countDocuments({}),
        ProductsModel.countDocuments({}),
        Order.countDocuments({}),
      ]);

    const totalSales = totalSalesResult[0]?.totalSales || 0;

    return res.status(200).json({
      totalSales,
      totalUsers,
      totalProducts,
      totalOrders,
    });
  } catch (error) {
    console.error("DashboardCard Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
