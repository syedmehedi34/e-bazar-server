import { Request, Response } from 'express'
import Order from '../../model/ordersModel/ordersModel'

export const Orders = async (req: Request, res: Response) => {
  const pageParam = (req.query.page as string) || '1'
  const sort = req.query.sort
  const search = req.query.search
  const page = parseInt(pageParam)
  const limit = 5
  const skip = (page - 1) * limit

  const query: any = {}

  if (search) {
    query.$or = [
      { "customer.name": { $regex: search, $options: "i" } },
      { "customer.email": { $regex: search, $options: "i" } },
      { "customer.phone": { $regex: search, $options: "i" } },
      { "product.name": { $regex: search, $options: "i" } },
      { "product.id": { $regex: search, $options: "i" } },
      { "payment.method": { $regex: search, $options: "i" } },
      { "payment.transactionId": { $regex: search, $options: "i" } },
      { "delivery.status": { $regex: search, $options: "i" } }
    ];
  }

  const sortOptions: any = {};

  if (sort) {
    switch (sort) {
      case "latest":
        sortOptions.createdAt = -1;
        break;

      case "older":
        sortOptions.createdAt = 1;
        break;

      case "low-high":
        sortOptions["product.totalPrice"] = 1;
        break;

      case "high-low":
        sortOptions["product.totalPrice"] = -1;
        break;

      case "paid":
      case "pending":
      case "failed":
      case "refunded":
        query["payment.paymentStatus"] = sort; 
        break;


      default:
        sortOptions.createdAt = -1;
        break;
    }
  }


  const order = await Order.find(query)
    .lean()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
  const total = await Order.countDocuments(query)
  const count = Math.ceil(total / limit)

  const pageArray = Array.from({ length: count }, (_, i) => i + 1);

  res.status(200).send({
    order,
    pageArray
  })
}
