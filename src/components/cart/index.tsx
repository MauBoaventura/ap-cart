import { IProduct } from "@/interfaces/Item";

export default function Cart({ itens }: { itens: IProduct[] }) {
    const total = itens.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="bg-gray-200 p-4 sticky top-0">
            <h1 className="text-2xl font-bold mb-2">Seu carrinho</h1>
            <p className="text-gray-600 mb-4">Veja os itens que você selecionou.</p>
            <ul>
                {itens.map((item) => (
                    <li key={item.id} className="mb-4">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-700">R${item.value.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
            <p className="text-xl font-semibold">Total: R${total.toFixed(2)}</p>
        </div>
    );
}