export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: ProductImage[];
  company: string;
}

export interface ProductImage {
  id: number;
  main: string;
  thumbnail: string;
  alt: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface LightboxState {
  isOpen: boolean;
  currentImageIndex: number;
}