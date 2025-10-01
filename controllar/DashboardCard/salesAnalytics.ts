import { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const getProductsAnalytics = async (req: Request, res: Response) => {
    try {
        const orders: any[] = await Order.find(
            {},
            "product.name product.totalPrice payment.amount payment.paymentStatus createdAt"
        ).lean();
   
        const formattedData = orders.map((order) => ({
            name: order.product?.name,
            totalPrice: order.product?.totalPrice,
            amount: order.payment?.amount,
            paymentStatus: order.payment?.paymentStatus,
            date: order.createdAt
                ? new Date(order?.createdAt).toISOString().split("T")[0]
                : "N/A",
        }));
             console.log(formattedData)
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("OrdersAnalytics Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
