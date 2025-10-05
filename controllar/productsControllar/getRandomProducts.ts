import { Request, Response } from 'express'
import ProductsModel from '../../model/productsModel/productsModel'

export const getRandomProducts = async (req: Request, res: Response) => {
  const products = await ProductsModel.aggregate([{ $sample: { size: 20 } }])

  res.send(products)
}
