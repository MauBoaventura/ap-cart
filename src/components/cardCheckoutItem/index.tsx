import { IItem } from "@/interfaces/Item";
import Image from "next/image";

export default function CardCheckoutItem({ item, onRemoveOne, onRemoveAll, onAddOne }: { item: IItem, onRemoveOne: (id: string) => void, onRemoveAll: (id: string) => void, onAddOne: (id: string) => void }) {

    return (
            <div className="relative flex flex-row items-center justify-between border-b border-gray-300 py-2 min-h-[80px] w-full">
                <button className="absolute top-1 right-0 text-gray-500 hover:text-red-500" onClick={() => onRemoveAll(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8.414l3.293 3.293a1 1 0 11-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 111.414-1.414L10 8.586l2.879-2.879a1 1 0 111.414 1.414L11.414 10z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex flex-row items-center">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-200 rounded-full mr-4">
                        <Image src={item.product.image} alt={item.product.name} className="rounded-lg" width={80} height={80} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">{item.product.name}</h3>
                        <p className="text-xs text-gray-500">{item.product.description}</p>
                        <p className="text-xs text-gray-500">R$ {item.product.value.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Frete: {(item.product.value * 0.1).toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-2 ">
                    <button className="text-red-700 bg-red-200 px-2 rounded-full flex items-center" onClick={() => onRemoveOne(item.product.id)}>-</button>
                    <p className="text-sm font-semibold mx-4">{item.quant}</p>
                    <button className="text-green-700 bg-green-200 px-2 rounded-full flex items-center" onClick={() => onAddOne(item.id)}>+</button>
                </div>
        </div>
    );
}