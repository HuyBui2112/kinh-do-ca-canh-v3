import { Types } from 'mongoose';

// Interface cho đầu vào
export interface GetProductsParams {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    inStock?: boolean;
    sortBy?: 'name' | 'price' | 'rating';
    sortOrder?: 'asc' | 'desc';
}

export interface GetProductDetailParams {
    id: string;
}

export interface SearchProductsParams {
    keyword: string;
    page?: number;
    limit?: number;
}

// Interface cho đầu ra
export interface ProductListItem {
    _id: Types.ObjectId;
    pd_name: string;
    pd_price: {
        price: number;
        discount: number;
    };
    pd_image: {
        url: string;
        alt: string;
    };
    pd_category: string;
    pd_rating: number;
    discountedPrice?: number;
}

export interface ProductDetail {
    _id: Types.ObjectId;
    pd_name: string;
    pd_description: string;
    pd_price: {
        price: number;
        discount: number;
    };
    pd_image: Array<{
        url: string;
        alt: string;
    }>;
    pd_category: string;
    pd_specification: Array<{
        key: string;
        value: string;
    }>;
    pd_seo: {
        title: string;
        description: string;
        image: string;
        keywords: string[];
        slug: string;
    };
    pd_stock: number;
    pd_rating: number;
    pd_numreviews: number;
    createdAt: Date;
    updatedAt: Date;
    discountedPrice?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
    message?: string;
}

export interface ProductsResponse extends PaginatedResponse<ProductListItem> {}
export interface SearchProductsResponse extends PaginatedResponse<ProductListItem> {}
export interface ProductDetailResponse {
    data: ProductDetail | null;
    message?: string;
}