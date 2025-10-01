import { Request, Response } from 'express'
import ProductsModel from '../../model/productsModel/productsModel'

export const ProductUpdateById = async (req: Request, res: Response) => {
  const id = req.query._id
  const updateData = req.body

  const updatedProduct = await ProductsModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )

  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' })
  }
 
  

  res.status(200).json({
    message: 'Product updated successfully',
    product: updatedProduct
  })
}
