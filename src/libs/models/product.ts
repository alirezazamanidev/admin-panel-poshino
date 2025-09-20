import { Category } from "./category";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  discount: number;
  thumbnailUrls: Record<string, string>;
  details: Record<string, string>;
  categoryId: string;
  category: Category;
  created_at: Date;
  updated_at: Date;
}
export interface ProductVariant {
  id:string;
  sku:string;
  price:number;
  discount:number;
  sold:number;
  stockQuantity:number;
  productId:string;
  isActive:boolean;
  size:string;
  color:ProductColor;
  product:Product;
  created_at:Date;
  updated_at:Date;

}

export interface ProductColor {
    id:string;
    name:string
    code:string;
    imageUrl:string;
    variants:ProductVariant[];

}