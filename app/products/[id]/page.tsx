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

interface PageProps {
  params: { id: string };
}

// This page component is a server component.
export default async function Page({ params }: PageProps) {
  const { id } = params; 
  let product: Product | null = null;

  try {
    // Assuming your API endpoint is defined under /api/products
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    product = res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return <ProductDetails product={product} />;
}
