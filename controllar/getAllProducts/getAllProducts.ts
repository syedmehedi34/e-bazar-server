import { Request, Response } from 'express'
import ProductsModel from '../../model/productsModel/productsModel'

export const getAllProducts = async (req: Request, res: Response) => {
  const {
    sort,
    category,
    minPrice,
    maxPrice,
    search,
    page = '1',
    limit = '20'
  } = req.query

  const query: any = {}
  if (category) {
    query.subCategory = category
  }

  if(search){
    query.$or =[
      {title:{ $regex: search, $options: 'i'  }},
      {description:{ $regex: search, $options: 'i'  }},
      {category:{ $regex: search, $options: 'i'  }},
      {subCategory:{ $regex: search, $options: 'i'  }},
      {brand:{ $regex: search, $options: 'i'  }}
    ]
  }

  if (minPrice || maxPrice) {
    query.price = {}
    if (minPrice) query.price.$gte = Number(minPrice)
    if (maxPrice) query.price.$lte = Number(maxPrice)
  }

  let products = ProductsModel.find(query)
  if (sort) {
    switch (sort) {
      case 'latest':
        products = products.sort({ createdAt: -1 })
        break
      case 'older':
        products = products.sort({ createdAt: 1 })
        break
      case 'low-high':
        products = products.sort({ price: 1 })
        break
      case 'high-low':
        products = products.sort({ price: -1 })
        break
      default:
        break
    }
  }
  const pageNumber = parseInt(page as string, 10) || 1
  const pageSize = parseInt(limit as string, 10) || 20
  const skip = (pageNumber - 1) * pageSize
  const product = await products.skip(skip).limit(pageSize).lean()
  const total = await ProductsModel.countDocuments(query);
  const allProducts = await ProductsModel.find().lean();
  res.send({
    total,
    product,
    allProducts,
    totalProducts : allProducts.length
  })
}
