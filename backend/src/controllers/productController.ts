import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Product from '../models/productModel';
import { 
    GetProductsParams, 
    ProductListItem, 
    GetProductDetailParams,
    SearchProductsParams,
    ProductsResponse,
    SearchProductsResponse,
    ProductDetailResponse
} from '../utils/product.interface';
import { removeVietnameseTone } from '../utils/helpers';

/**
 * @desc    Lấy danh sách sản phẩm có phân trang, lọc và sắp xếp
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req: Request<{}, {}, {}, GetProductsParams>, res: Response<ProductsResponse>) => {
    try {
        const {
            page = 1,
            limit = 10,
            minPrice,
            maxPrice,
            category,
            inStock,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        // Xây dựng điều kiện lọc
        const filter: any = {};

        // Lọc theo khoảng giá
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter['pd_price.price'] = {};
            if (minPrice !== undefined) filter['pd_price.price']['$gte'] = Number(minPrice);
            if (maxPrice !== undefined) filter['pd_price.price']['$lte'] = Number(maxPrice);
        }

        // Lọc theo danh mục
        if (category) {
            filter.pd_category = category;
        }

        // Lọc theo còn hàng hay không
        if (inStock === true) {
            filter.pd_stock = { $gt: 0 };
        }

        // Xây dựng sắp xếp
        const sort: any = {};
        
        switch (sortBy) {
            case 'name':
                sort.pd_name = sortOrder === 'asc' ? 1 : -1;
                break;
            case 'price':
                sort['pd_price.price'] = sortOrder === 'asc' ? 1 : -1;
                break;
            case 'rating':
                sort.pd_rating = sortOrder === 'desc' ? -1 : 1; // Rating thường sắp xếp giảm dần
                break;
            default:
                sort.pd_name = 1;
        }

        // Tính toán pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        // Đếm tổng số lượng
        const totalItems = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limitNum);

        // Lấy dữ liệu theo filter và pagination
        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .select('_id pd_name pd_price pd_image pd_category pd_rating')
            .lean();

        // Chuyển đổi kết quả sang định dạng mong muốn
        const formattedProducts: ProductListItem[] = products.map(product => ({
            _id: product._id,
            pd_name: product.pd_name,
            pd_price: product.pd_price,
            pd_image: product.pd_image[0] || { url: '', alt: '' },
            pd_category: product.pd_category,
            pd_rating: product.pd_rating,
            discountedPrice: product.pd_price.price - (product.pd_price.price * product.pd_price.discount / 100)
        }));

        // Trả về kết quả
        res.status(200).json({
            data: formattedProducts,
            pagination: {
                totalItems,
                totalPages,
                currentPage: pageNum,
                itemsPerPage: limitNum
            }
        });
    } catch (error: any) {
        res.status(500).json({
            data: [],
            pagination: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 1,
                itemsPerPage: 10
            },
            message: error.message || 'Đã xảy ra lỗi khi lấy danh sách sản phẩm'
        });
    }
};

/**
 * @desc    Lấy chi tiết sản phẩm theo ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductDetail = async (req: Request<GetProductDetailParams>, res: Response<ProductDetailResponse>) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID có hợp lệ không
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                data: null,
                message: 'ID sản phẩm không hợp lệ'
            });
        }

        // Tìm sản phẩm theo ID
        const product = await Product.findById(id).lean();

        // Nếu không tìm thấy sản phẩm
        if (!product) {
            return res.status(404).json({
                data: null,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        // Tính giá sau khi giảm giá
        const discountedPrice = product.pd_price.price - (product.pd_price.price * product.pd_price.discount / 100);

        // Trả về chi tiết sản phẩm
        const productDetail: ProductDetailResponse = {
            data: {
                ...product,
                discountedPrice
            }
        };

        res.status(200).json(productDetail);
    } catch (error: any) {
        res.status(500).json({
            data: null,
            message: error.message || 'Đã xảy ra lỗi khi lấy chi tiết sản phẩm'
        });
    }
};

/**
 * @desc    Tìm kiếm sản phẩm theo từ khóa
 * @route   GET /api/products/search
 * @access  Public
 */
export const searchProducts = async (req: Request<{}, {}, {}, SearchProductsParams>, res: Response<SearchProductsResponse>) => {
    try {
        const { keyword, page = 1, limit = 10 } = req.query;

        if (!keyword || keyword.trim() === '') {
            return res.status(400).json({
                data: [],
                pagination: {
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: Number(page),
                    itemsPerPage: Number(limit)
                },
                message: 'Từ khóa tìm kiếm không được để trống'
            });
        }

        // Chuyển keyword thành dạng không dấu, chữ thường
        const normalizedKeyword = removeVietnameseTone(keyword.toLowerCase());

        // Lấy tất cả sản phẩm với chỉ _id và pd_name
        const allProducts = await Product.find({}).select('_id pd_name').lean();

        // Tìm các sản phẩm phù hợp với từ khóa
        const matchingProductIds = allProducts
            .filter(product => {
                const normalizedName = removeVietnameseTone(product.pd_name.toLowerCase());
                return normalizedName.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedName);
            })
            .map(product => product._id);

        // Tính toán pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        // Đếm tổng số lượng sản phẩm phù hợp
        const totalItems = matchingProductIds.length;
        const totalPages = Math.ceil(totalItems / limitNum);

        // Lấy chi tiết sản phẩm từ danh sách ID phù hợp với pagination
        const paginatedIds = matchingProductIds.slice(skip, skip + limitNum);
        
        const products = await Product.find({ _id: { $in: paginatedIds } })
            .select('_id pd_name pd_price pd_image pd_category pd_rating')
            .lean();

        // Chuyển đổi kết quả sang định dạng mong muốn
        const formattedProducts: ProductListItem[] = products.map(product => ({
            _id: product._id,
            pd_name: product.pd_name,
            pd_price: product.pd_price,
            pd_image: product.pd_image[0] || { url: '', alt: '' },
            pd_category: product.pd_category,
            pd_rating: product.pd_rating,
            discountedPrice: product.pd_price.price - (product.pd_price.price * product.pd_price.discount / 100)
        }));

        // Trả về kết quả
        res.status(200).json({
            data: formattedProducts,
            pagination: {
                totalItems,
                totalPages,
                currentPage: pageNum,
                itemsPerPage: limitNum
            }
        });
    } catch (error: any) {
        res.status(500).json({
            data: [],
            pagination: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 1,
                itemsPerPage: 10
            },
            message: error.message || 'Đã xảy ra lỗi khi tìm kiếm sản phẩm'
        });
    }
};
