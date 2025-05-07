import mongoose, { Document, Schema, Types } from "mongoose";

// Định nghĩa interface cho Price
export interface Price {
    price: number,
    discount: number
}

// Định nghĩa interface cho Image
export interface Image {
    url: string,
    alt: string
}

// Định nghĩa interface cho SEO info
export interface SEOInfo {
    title: string,
    description: string,
    image: string,
    keywords: string[],
    slug: string
}

// Định nghĩa interface cho Product document
export interface IProduct extends Document {
    _id: Types.ObjectId,
    pd_name: string,
    pd_description: string,
    pd_price: Price,
    pd_image: Image[],
    pd_category: string,
    pd_seo: SEOInfo,
    pd_stock: number,
    pd_rating: number,
    pd_numreviews: number,
    createdAt: Date;
    updatedAt: Date;
}

// Schema cho Price
const PriceSchema = new Schema<Price>({
    price: { 
        type: Number, 
        required: [true, 'Giá sản phẩm là bắt buộc'], 
        default: 0 
    },
    discount: { 
        type: Number, 
        default: 0, 
        min: [0, 'Giảm giá không được nhỏ hơn 0'],
        max: [100, 'Giảm giá không được lớn hơn 100%']
    }
}, { _id: false });

// Schema cho Image
const ImageSchema = new Schema<Image>({
    url: { 
        type: String, 
        required: [true, 'URL hình ảnh là bắt buộc'] 
    },
    alt: { 
        type: String, 
        default: '' 
    }
}, { _id: false });

// Schema cho SEO info
const SEOInfoSchema = new Schema<SEOInfo>({
    title: { 
        type: String, 
        default: ''
    },
    description: { 
        type: String, 
        default: ''
    },
    image: { 
        type: String, 
        default: ''
    },
    keywords: [{ 
        type: String
    }],
    slug: { 
        type: String, 
        required: [true, 'Slug SEO là bắt buộc'],
        unique: true,
        index: true
    }
}, { _id: false });

// Schema cho Product
const ProductSchema = new Schema<IProduct>(
    {
        pd_name: { 
            type: String, 
            required: [true, 'Tên sản phẩm là bắt buộc'],
            trim: true,
            index: true
        },
        pd_description: { 
            type: String, 
            required: [true, 'Mô tả sản phẩm là bắt buộc'] 
        },
        pd_price: { 
            type: PriceSchema, 
            required: [true, 'Thông tin giá sản phẩm là bắt buộc'] 
        },
        pd_image: [{ 
            type: ImageSchema, 
            required: [true, 'Hình ảnh sản phẩm là bắt buộc']
        }],
        pd_category: { 
            type: String, 
            required: [true, 'Danh mục sản phẩm là bắt buộc'],
            index: true
        },
        pd_seo: { 
            type: SEOInfoSchema, 
            required: [true, 'Thông tin SEO là bắt buộc'] 
        },
        pd_stock: { 
            type: Number, 
            required: [true, 'Số lượng tồn kho là bắt buộc'],
            min: [0, 'Số lượng tồn kho không được nhỏ hơn 0'],
            default: 0
        },
        pd_rating: { 
            type: Number, 
            default: 0,
            min: [0, 'Đánh giá không được nhỏ hơn 0'],
            max: [5, 'Đánh giá không được lớn hơn 5']
        },
        pd_numreviews: { 
            type: Number, 
            default: 0,
            min: [0, 'Số lượng đánh giá không được nhỏ hơn 0']
        }
    },
    { 
        timestamps: true,
        toJSON: { 
            virtuals: true,
            transform: (_, ret) => {
                delete ret.__v;
                return ret;
            }
        },
        toObject: { virtuals: true }
    }
);

// Thêm indexes để tối ưu tìm kiếm
ProductSchema.index({ pd_name: 'text', 'pd_seo.title': 'text', 'pd_seo.description': 'text' });

// Virtual cho giá sau khi giảm giá
ProductSchema.virtual('discountedPrice').get(function(this: IProduct) {
    const discount = this.pd_price.discount || 0;
    const price = this.pd_price.price || 0;
    return price - (price * discount / 100);
});

// Tạo model Product
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;