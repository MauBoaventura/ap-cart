'use client'
import { IItemCheckout } from "@/interfaces/Item";
import { useEffect, useState } from "react";
import CardCheckoutItem from "../cardCheckoutItem";

export default function CartCheckout({ itens, setItens }: { itens: IItemCheckout[], setItens?: (itens: IItemCheckout[]) => void }) {
	const [cart, setCart] = useState<IItemCheckout[]>(itens);
	const total = cart.reduce((acc, item) => {
		if (item.isChecked) {
			return acc + (item.product.value * item.quant);
		}
		return acc;
	}, 0);

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

	useEffect(() => {
		setCart(itens as IItemCheckout[]);
	}, [itens]);

	useEffect(() => {
		if (setItens) {
			setItens(cart);
		}
	}, [cart]);

	const handleCheck = (id: string) => {
		const resp = cart.map((i) => {
			if (i.product.id === id) {
				return { ...i, isChecked: !i.isChecked };
			}
			return i;
		});
		setCart(resp);
		localStorage.setItem('cartItems', JSON.stringify(resp));
	}
	return (
		<div className="p-4">
			{cart.map((item) => (
				<div className="flex gap-2" key={item.id}>
					<input type="checkbox" className="mr-2" checked={item.isChecked} onClick={() => handleCheck(item.id)} />
					<CardCheckoutItem item={item} onRemoveOne={handleRemoveOneFromCart} onRemoveAll={handleRemoveAllByProduct} onAddOne={handleAddOneToCart} />
				</div>
			))}
			{/* <div className="w-full flex">
				<p className="text-xl font-semibold">Total: R${total.toFixed(2)}</p>
			</div> */}
		</div>
	);
}