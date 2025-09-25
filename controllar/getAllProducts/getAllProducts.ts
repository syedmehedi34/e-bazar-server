import { Request, Response } from 'express';
import ProductsModel from '../../model/productsModel/productsModel';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      sort,
      category,
      minPrice,
      maxPrice,
      search,
      page = '1',
      limit = '20'
    } = req.query || {};

    const query: any = {};

    // Category filter
    if (category) query.subCategory = category;

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting
    const sortOptions: any = {};
    if (sort) {
      switch (sort) {
        case 'latest': sortOptions.createdAt = -1; break;
        case 'older': sortOptions.createdAt = 1; break;
        case 'low-high': sortOptions.price = 1; break;
        case 'high-low': sortOptions.price = -1; break;
      }
    }

    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 20;
    const skip = (pageNumber - 1) * pageSize;


    const [total, products, allProducts] = await Promise.all([
      ProductsModel.countDocuments(query),
      ProductsModel.find(query).sort(sortOptions).skip(skip).limit(pageSize).lean(),
      ProductsModel.find({}).lean() 
    ]);

    res.send({
      total,
      product: products,
      allProducts, 
      totalProducts: allProducts.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};
