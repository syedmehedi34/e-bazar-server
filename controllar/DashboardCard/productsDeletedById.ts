import { Request, Response } from 'express'
import ProductsModel from '../../model/productsModel/productsModel'

export const ProductsDeleteById = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' })
  }
  const deletedProduct = await ProductsModel.deleteOne({_id: id});
  res.status(200).json({
    message: 'Product deleted successfully',
    deletedProduct
  })
}
