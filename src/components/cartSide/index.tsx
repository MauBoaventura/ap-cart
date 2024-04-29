'use client'
import { IItem } from "@/interfaces/Item";
import { IProduct } from "@/interfaces/Produto";
import { useEffect, useState } from "react";

export default function Cart({ itens, setItens }: { itens: IItem[], setItens?: (itens: IItem[]) => void}) {
	const [cart, setCart] = useState<IItem[]>(itens);
	useEffect(() => {
		const cartItems = localStorage.getItem('cartItems');
		console.log(cartItems);
		if (cartItems) {
			setCart(JSON.parse(cartItems));
		}
	}, [itens]);

	const handleAddToCart = (product: IProduct) => {
		let resp = [];

		if (cart.some((i) => i?.product?.id === product?.id)) {
			resp = cart.map((i) => {
				if (i.product.id === product.id) {
					return { ...i, quant: i.quant + 1 };
				}
				return i;
			});
		} else
			resp = [...cart, { id: product.id, product: product, quant: 1 }];

		console.log(resp);
		setCart(resp as IItem[]);

		localStorage.setItem('cartItems', JSON.stringify(resp));
	};

	const handleRemoveOneFromCart = (id: string) => {
		
		const resp = cart.map((i) => {
			if (i.product.id === id && i.quant === 1) {
				if (window.confirm('Tem certeza que deseja remover o último item do carrinho?')) {
					return { ...i, quant: i.quant - 1 };
				}
			} else if (i.product.id === id) {
				return { ...i, quant: i.quant - 1 };
			}
			return i;
		}).filter((i) => i.quant > 0);
		setCart(resp);
		localStorage.setItem('cartItems', JSON.stringify(resp));
	}

	const handleRemoveAllFromCart = () => {
		setCart([]);
		localStorage.setItem('cartItems', JSON.stringify([]));
	}

	const handleCheckout = () => {
		alert('Compra realizada com sucesso!');
		handleRemoveAllFromCart();
	}


	const total = cart.reduce((acc, item) => acc + (item.product.value * item.quant), 0);

	useEffect(() => {
		if (setItens) {
			setItens(cart);
		}
	}, [cart]);

	return (
		<div className="bg-gray-200 p-4 sticky top-0">
			<h1 className="text-2xl font-bold mb-2">Seu carrinho</h1>
			<p className="text-gray-600 mb-4">Veja os itens que você selecionou.</p>
			<ul>
				{cart.map((item) => (
					<li key={item.id} className="mb-4">
						<h2 className="text-xl font-semibold">{item.product.name}</h2>
						<div className="flex justify-between">
							<div className="flex gap-2">
							<button className="text-red-700 bg-red-200 px-2 rounded-full flex items-center" onClick={() => handleRemoveOneFromCart(item.product.id)}>-</button>
								<h2 className="text-gray-700 underline">{item.quant}</h2>
								<button className="text-green-700 bg-green-200 px-2 rounded-full flex items-center" onClick={() => handleAddToCart(item.product)}>+</button>
								<p className="text-gray-700">R${item.product.value.toFixed(2)}</p>
							</div>
							<div className="flex gap-1">
								<h2 className="text-gray-700">Total: R${(item.product.value * item.quant).toFixed(2)}</h2>
							</div>
						</div>
					</li>
				))}
			</ul>
			<p className="text-xl font-semibold">Total: R${total.toFixed(2)}</p>
			<div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleCheckout}
        >
          Finalizar compra
        </div>
		</div>
	);
}