import express, { RequestHandler } from 'express';
import { getProducts, searchProducts, getProductDetail } from '../controllers/productController';

const router = express.Router();

/**
 * @desc    Lấy danh sách sản phẩm có phân trang, lọc và sắp xếp
 * @route   GET /api/products
 * @access  Public
 */
router.get('/', getProducts as unknown as RequestHandler);

/**
 * @desc    Tìm kiếm sản phẩm theo từ khóa
 * @route   GET /api/products/search
 * @access  Public
 */
router.get('/search', searchProducts as unknown as RequestHandler);

/**
 * @desc    Lấy chi tiết sản phẩm theo ID
 * @route   GET /api/products/:id
 * @access  Public
 */
router.get('/:id', getProductDetail as unknown as RequestHandler);

export default router; 