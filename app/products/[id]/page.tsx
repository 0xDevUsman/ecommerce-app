import ProductDetails from '@/app/components/ProductDetails';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const  id  = (await params).id;
  let product: Product | null = null;
  console.log(id)

  try {
    // Assuming your API endpoint is defined under /api/products
    console.log("hello world  ")
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`);
    product = res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return <ProductDetails product={product} />;
}
