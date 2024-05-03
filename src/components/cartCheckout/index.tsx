'use client'
import { IItem } from "@/interfaces/Item";
import { IProduct } from "@/interfaces/Produto";
import { useEffect, useState } from "react";
import CardCheckoutItem from "../cardCheckoutItem";

export default function CartCheckout({ itens, setItens }: { itens: IItem[], setItens?: (itens: IItem[]) => void }) {
	const [cart, setCart] = useState<IItem[]>(itens);
	const total = cart.reduce((acc, item) => acc + (item.product.value * item.quant), 0);



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

	const handleAddOneToCart = (id: string) => {
		const resp = cart.map((i) => {
			if (i.product.id === id) {
				return { ...i, quant: i.quant + 1 };
			}
			return i;
		});
		setCart(resp);
		localStorage.setItem('cartItems', JSON.stringify(resp));
	}

	const handleRemoveAllByProduct = (id: string) => {
		const resp = cart.filter((i) => i.product.id !== id);
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

	useEffect(() => {
		setCart(itens);
	}, [itens]);

	useEffect(() => {
		if (setItens) {
			setItens(cart);
		}
	}, [cart]);

	return (
		<div className="p-4">
			{cart.map((item) => (
				<CardCheckoutItem key={item.id} item={item} onRemoveOne={handleRemoveOneFromCart} onRemoveAll={handleRemoveAllByProduct} onAddOne={handleAddOneToCart} />
			))}
			<p className="text-xl font-semibold">Total: R${total.toFixed(2)}</p>
		</div>
	);
}