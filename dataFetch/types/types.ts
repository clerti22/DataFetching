export interface Products{
    id:number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountedPercentage: number,
    rating: number,
    stock: number,
    thumbnail: string
}


export interface ProductsResponse {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}
