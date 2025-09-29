import { Request, Response } from 'express'
import ProductsModel from '../../model/productsModel/productsModel'

export const ProductsList = async (req: Request, res: Response) => {
  try {
    const pageParam = (req.query.page as string) || '1'
    const sort = req.query.sort
    const search = req.query.search
    const page = parseInt(pageParam)
    const limit = 10
    const skip = (page - 1) * limit
    const query:any = {}

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ]
    }

    const sortOptions: any = {}
    if (sort) {
      switch (sort) {
        case 'latest':
          sortOptions.createdAt = -1
          break
        case 'older':
          sortOptions.createdAt = 1
          break
        case 'low-high':
          sortOptions.price = 1
          break
        case 'high-low':
          sortOptions.price = -1
          break
        case 'in_stock':
          sortOptions.stock = -1
          break
        case 'out_of_stock':
          sortOptions.stock = 1
          break
      }
    }
    const products = await ProductsModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await ProductsModel.countDocuments(query)
    const count = Math.ceil(total / limit)

    const pageArray = Array.from({ length: count }, (_, i) => i + 1)
    res.status(200).json({
      count,
      pageArray,
      products
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
