'use client'
import { IItemCheckout } from "@/interfaces/Item";
import { useEffect, useState } from "react";

export default function CartSideCheckout({ itens, setItens }: { itens: IItemCheckout[], setItens: (itens: IItemCheckout[]) => void }) {
	const [cart, setCart] = useState<IItemCheckout[]>(itens);
	const total = cart.reduce((acc, item) => {
		if (item.isChecked) {
			return acc + (item.product.value * item.quant);
		}
		return acc;
	}, 0);
	useEffect(() => {
		setCart(itens);
	}, [itens]);

	const handleRemoveAllSelectedFromCart = () => {
		const resp = cart.filter((i) => !i.isChecked);
		setCart(resp);
		setItens(resp);
		localStorage.setItem('cartItems', JSON.stringify(resp));
	}
	const handleCheckout = () => {
		alert('Compra realizada com sucesso!');
		handleRemoveAllSelectedFromCart();
	}


	return (
		<div className="bg-gray-200 p-4 sticky top-0">
			<h1 className="text-2xl font-bold mb-4">Seu carrinho</h1>
			{/* <ul>
				{cart.map((item) => {

					if (item.isChecked)
						return (
							<li key={item.id} className="p-2 mb-2 border-2 border-slate-300 rounded-md">
								<h2 className="text-lg font-semibold">{item.product.name}</h2>
								<div className="flex flex-row justify-between items-end">
									<div className="flex flex-col">
										<div className="flex gap-2">
											<h2 className="text-gray-700">{item.quant} X</h2>
											<p className="text-gray-700">R${item.product.value.toFixed(2)}</p>
										</div>
										<p className="text-xs text-gray-500">Frete: R$ {(item.product.value * 0.1).toFixed(2)}</p>
									</div>
									<div className="flex gap-1 ">
										<h2 className="text-gray-700">Total: R${(item.product.value * item.quant).toFixed(2)}</h2>
									</div>
								</div>
							</li>
						)
				}
				)}
			</ul> */}
			<div className="flex flex-col text-end gap-6">
				<div className="flex justify-between">
					<p className="text-lg font-semibold">Subtotal </p>
					<p className="text-lg font-semibold">R${total.toFixed(2)}</p>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-2">
					<p className="text-lg font-semibold">Frete </p>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.001 14H13.001C14.101 14 15.001 13.1 15.001 12V2H6.00098C4.50098 2 3.19099 2.82999 2.51099 4.04999" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M2.00098 17C2.00098 18.66 3.34098 20 5.00098 20H6.00098C6.00098 18.9 6.90098 18 8.00098 18C9.10098 18 10.001 18.9 10.001 20H14.001C14.001 18.9 14.901 18 16.001 18C17.101 18 18.001 18.9 18.001 20H19.001C20.661 20 22.001 18.66 22.001 17V14H19.001C18.451 14 18.001 13.55 18.001 13V10C18.001 9.45 18.451 9 19.001 9H20.291L18.581 6.01001C18.221 5.39001 17.561 5 16.841 5H15.001V12C15.001 13.1 14.101 14 13.001 14H12.001" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M8.00098 22C9.10555 22 10.001 21.1046 10.001 20C10.001 18.8954 9.10555 18 8.00098 18C6.89641 18 6.00098 18.8954 6.00098 20C6.00098 21.1046 6.89641 22 8.00098 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M16.001 22C17.1055 22 18.001 21.1046 18.001 20C18.001 18.8954 17.1055 18 16.001 18C14.8964 18 14.001 18.8954 14.001 20C14.001 21.1046 14.8964 22 16.001 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M22.001 12V14H19.001C18.451 14 18.001 13.55 18.001 13V10C18.001 9.45 18.451 9 19.001 9H20.291L22.001 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M2.00098 8H8.00098" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M2.00098 11H6.00098" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M2.00098 14H4.00098" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					</div>


					<p className="text-lg font-semibold">R${(total * 0.1).toFixed(2)} </p>
				</div>
				<div className="flex justify-between pl-2 py-2 rounded-lg bg-gradient-to-r from-amber-200 to-yellow-500 shadow-sm">
					<p className="text-lg font-semibold">Cupons </p>
					<div className="">
						<span className="ml-2  font-bold">R$ {total}</span>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block " fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
						</svg>
					</div>
				</div>
				<div className="flex justify-between pl-2 py-2 rounded-lg text-slate-100 bg-gradient-to-r from-slate-700 to-red-600 shadow-sm">
					<p className="text-lg font-semibold">Descontos </p>
					<div className="">
						<span className="ml-2 font-bold">R$ {total}</span>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block " fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
						</svg>
					</div>
				</div>
			</div>
			<div
				className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
				onClick={handleCheckout}
			>
				Finalizar compra
			</div>
		</div>
	);
}