import { Request, Response } from "express";
import Blog from "../../model/BlogsModel/blogsModel";

export const GetAllBlogs = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1; 
        const limit = 4; 

        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        // Page array for frontend pagination buttons
        const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

        res.status(200).send({
            blogs,
            pageArray,
           
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
