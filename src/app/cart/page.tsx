'use client'

import CartCheckout from "@/components/cartCheckout";
import CartSide from "@/components/cartSide";
import Cart from "@/components/cartSide";
import { IItem } from "@/interfaces/Item";
import { IProduct } from "@/interfaces/Produto";
import { useEffect, useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<IItem[]>([]);


  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }

  }, []);

  return (
    <div className="flex justify-center items-center" >
      <div className="grid grid-cols-6 w-[1180px] m-6 gap-4" >
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-slate-100 rounded-lg p-4">
            <h1 className="text-2xl font-bold my-2">Carrinho de Compras</h1>
            <CartCheckout itens={cart} setItens={setCart} />
          </div>
          <div className="bg-slate-100 rounded-lg p-4">
            <h1 className="text-2xl font-bold my-2">Resumo</h1>
            <CartCheckout itens={cart} setItens={setCart} />
          </div>
          <div className="bg-slate-100 rounded-lg p-4">
            Outra coisa
          </div>
        </div>
        <div className="col-span-2 bg-gray-200">
          <CartSide itens={cart} setItens={setCart} />
        </div>
      </div>
    </div>

  );
}
