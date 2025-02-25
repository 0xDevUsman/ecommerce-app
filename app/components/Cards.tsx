import Image from "next/image";

interface CardProps {
  name: string;
  price: number;
  image: string;
}

const Cards = ({ name, price, image }: CardProps) => (
  <div className="bg-white h-[400px] shadow-md p-4 max-w-xs sm:w-80 rounded-lg group cursor-pointer transition-transform duration-300 transform hover:scale-105 flex flex-col">
    <div className="w-full h-48 md:h-56 lg:h-64">
      <Image
        className="w-full h-full rounded-t-lg object-cover"
        src={image}
        width={250}
        height={250}
        alt={name}
        layout="responsive"
      />
    </div>
    <div className="mt-4 flex flex-col justify-between">
      <h3 className="text-base md:text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-lg md:text-xl font-bold text-gray-900 mt-2">${price}.00</p>
    </div>
  </div>
);

export default Cards;
