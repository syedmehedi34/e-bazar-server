import { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const UserOrders = async (req: Request, res: Response) => {
    try {
        const userEmail = req.query.email as string;
        const page = parseInt(req.query.page as string) || 1; 
        const limit =  5; 

        if (!userEmail) {
            return res.status(400).json({ message: "Email is required" });
        }

        // 🔹 Aggregation for summary
        const stats = await Order.aggregate([
            { $match: { "customer.email": userEmail } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalPaid: {
                        $sum: { $cond: [{ $eq: ["$payment.paymentStatus", "paid"] }, 1, 0] },
                    },
                    totalPending: {
                        $sum: { $cond: [{ $eq: ["$payment.paymentStatus", "pending"] }, 1, 0] },
                    },
                    totalCanceled: {
                        $sum: { $cond: [{ $eq: ["$payment.orderStatus", "canceled"] }, 1, 0] },
                    },
                },
            },
        ]);

        // 🔹 Pagination
        const skip = (page - 1) * limit;
        const totalOrders = await Order.countDocuments({ "customer.email": userEmail });
        const totalPages = Math.ceil(totalOrders / limit);

        const orders = await Order.find({ "customer.email": userEmail })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // 🔹 Create page array for frontend
        const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

        // 🔹 Send response
        res.status(200).json({
            summary: stats[0] || {
                totalOrders: 0,
                totalPaid: 0,
                totalPending: 0,
                totalCanceled: 0,
            },
            orders,
            pageArray,
           
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
