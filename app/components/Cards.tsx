import Image from "next/image";

interface cardProps {
  name: string;
  price: number;
  image: string;
}

const Cards = ({ name, price, image }: cardProps) => (
  <div className="bg-white shadow-md p-4 w-80 rounded-lg group cursor-pointer transition-transform duration-300 transform hover:scale-105 flex flex-col h-full">
    <Image
      className="w-full rounded-t-lg object-cover"
      src={image}
      width={250}
      height={250}
      alt={name}
    />
    <div className="mt-4 flex flex-col justify-between">
      <h3 className="text-base font-bold text-gray-900">{name}</h3>
      <p className="text-lg font-bold text-gray-900 mt-2">${price}.00</p>
    </div>
  </div>
);

export default Cards;
