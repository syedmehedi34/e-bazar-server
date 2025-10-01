import { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";


export const ReportCard = async (req: Request, res: Response) => {
    try {
        const [
            TotalSales,
            totalRevenueResult,
            TotalPendingOrder,
            TotalPaidOrder,
            totalOrders,
            revenueData,
            topSellingProducts
        ] = await Promise.all([

            // Total Sales
            Order.aggregate([
                {
                    $group: {
                        _id: null,
                        TotalSales: { $sum: "$payment.amount" },
                    },
                },
            ]),

            // Total Revenue
            Order.aggregate([
                { $match: { "payment.paymentStatus": "paid" } },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: "$payment.amount" },
                    },
                },
            ]),

            // Pending Orders Count
            Order.countDocuments({ "payment.paymentStatus": "pending" }),

            // Paid Orders Count
            Order.countDocuments({ "payment.paymentStatus": "paid" }),

            // Total Orders
            Order.countDocuments({}),

            // Revenue Data
            Order.aggregate([
                { $match: { "payment.paymentStatus": "paid" } },
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$createdAt" },
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" }
                        },
                        dailyRevenue: { $sum: "$payment.amount" }
                    }
                },
                { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
            ]),

            // Top Selling Products
            Order.aggregate([
                {
                    $group: {
                        _id: "$product.id", // group by product id
                        title: { $first: "$product.name" },
                        image: { $first: "$product.image" },
                        category: { $first: "$product.category" },
                        totalQuantity: { $sum: "$product.quantity" },
                        totalSales: { $sum: "$product.totalPrice" }
                    }
                },
                { $sort: { totalQuantity: -1 } }, // highest quantity first
                { $limit: 10 } // top 10 products
            ])
        ]);

        const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;
        const TotalSalesReport = TotalSales[0]?.TotalSales || 0;

        return res.status(200).json({
            totalRevenue,
            TotalPaidOrder,
            TotalSalesReport,
            TotalPendingOrder,
            totalOrders,
            revenueData,
            topSellingProducts
        });

    } catch (error) {
        console.error("DashboardCard Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
