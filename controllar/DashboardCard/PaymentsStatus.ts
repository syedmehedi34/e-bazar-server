import { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const PaymentStatusUpdate = async (req: Request, res: Response) => {

    const { status, orderId } = req.body;
    if (!status || !orderId) {
        return res.status(400).json({ message: "Missing status or orderId" });
    }
    const updatedOrder = await Order.findOneAndUpdate(
        { "product.id": orderId },
        { $set: { "payment.paymentStatus": status } },
        { new: true }
    );
    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found with this productId" });
    }
    res.status(200).json({
        message: "Payment status updated successfully",
        order: updatedOrder,
    });
}