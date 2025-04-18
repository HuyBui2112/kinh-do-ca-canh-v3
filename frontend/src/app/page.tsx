import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <div className="bg-primary-50 p-8 rounded-xl shadow-sm text-center">
          <h1 className="text-4xl font-bold text-primary-800 mb-4">Chào mừng đến với Kinh Đô Cá Cảnh</h1>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto mb-6">
            Nơi cung cấp đa dạng cá cảnh, thủy sinh, phụ kiện và các sản phẩm chăm sóc cá chất lượng cao.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/san-pham" className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Xem sản phẩm
            </a>
            <a href="/ve-chung-toi" className="bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 py-3 px-6 rounded-lg font-medium transition-colors">
              Về chúng tôi
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Danh Mục Nổi Bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={category.url} 
              className="group bg-white border border-neutral-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-5xl text-primary-600">{category.icon}</div>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 text-center group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Sản Phẩm Bán Chạy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-neutral-100 relative">
                {product.onSale && (
                  <span className="absolute top-2 left-2 bg-warning-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Giảm giá
                  </span>
                )}
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  [Hình ảnh sản phẩm]
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  <a href={`/san-pham/${product.id}`}>{product.name}</a>
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    {product.onSale ? (
                      <>
                        <span className="text-danger-600 font-bold">{product.salePrice}</span>
                        <span className="text-neutral-500 text-sm line-through ml-2">{product.price}</span>
                      </>
                    ) : (
                      <span className="text-neutral-900 font-bold">{product.price}</span>
                    )}
                  </div>
                  <button className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full transition-colors">
                    <span className="sr-only">Thêm vào giỏ hàng</span>
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-primary-100 p-8 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">Đăng Ký Nhận Thông Tin</h2>
            <p className="text-neutral-700 mb-6">
              Nhận thông tin về sản phẩm mới, khuyến mãi và các mẹo chăm sóc cá cảnh.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Email của bạn"
                className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 flex-grow sm:max-w-md"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Bài Viết Mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center text-neutral-400">
                [Hình ảnh bài viết]
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-neutral-900 mb-2 hover:text-primary-600 transition-colors">
                  <a href={`/tin-tuc/${post.id}`}>{post.title}</a>
                </h3>
                <p className="text-neutral-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">{post.date}</span>
                  <a href={`/tin-tuc/${post.id}`} className="text-primary-600 hover:text-primary-800 font-medium transition-colors">
                    Đọc tiếp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Dữ liệu mẫu
const categories = [
  { id: 1, name: 'Cá Cảnh', url: '/ca-canh', icon: '🐠' },
  { id: 2, name: 'Cá Rồng', url: '/ca-rong', icon: '🐉' },
  { id: 3, name: 'Cá Koi', url: '/ca-koi', icon: '🎏' },
  { id: 4, name: 'Bể Cá', url: '/be-ca', icon: '🔷' },
  { id: 5, name: 'Thức Ăn', url: '/thuc-an', icon: '🧬' },
  { id: 6, name: 'Phụ Kiện', url: '/phu-kien', icon: '🧰' },
  { id: 7, name: 'Thủy Sinh', url: '/thuy-sinh', icon: '🌿' },
  { id: 8, name: 'Thuốc Cho Cá', url: '/thuoc-cho-ca', icon: '💊' },
];

const products = [
  { id: 1, name: 'Cá Betta Halfmoon Đỏ Trắng', price: '250.000₫', salePrice: '199.000₫', onSale: true },
  { id: 2, name: 'Cá Rồng Kim Long Size 20-25cm', price: '2.500.000₫', salePrice: null, onSale: false },
  { id: 3, name: 'Thức Ăn Tetra Pro Color 100ml', price: '150.000₫', salePrice: '120.000₫', onSale: true },
  { id: 4, name: 'Máy Bơm Oxy Quạt Đôi Sobo SB-988', price: '450.000₫', salePrice: null, onSale: false },
];

const posts = [
  { 
    id: 1, 
    title: 'Cách chăm sóc cá Betta cho người mới bắt đầu', 
    excerpt: 'Tìm hiểu những điều cơ bản khi chăm sóc cá Betta để cá khỏe mạnh và có màu sắc đẹp nhất.', 
    date: '15/08/2023' 
  },
  { 
    id: 2, 
    title: 'Top 5 loại cá cảnh dễ nuôi cho người mới', 
    excerpt: 'Khám phá những loại cá cảnh đẹp mắt nhưng không đòi hỏi nhiều kỹ thuật chăm sóc phức tạp.', 
    date: '02/09/2023' 
  },
  { 
    id: 3, 
    title: 'Hướng dẫn thiết lập bể thủy sinh mini', 
    excerpt: 'Các bước cơ bản để tạo ra một bể thủy sinh mini đẹp và bền vững ngay tại nhà.', 
    date: '20/09/2023' 
  },
];
