'use client'

import CartCheckout from "@/components/cartCheckout";
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
    <div className="w-[1180px] m-6">
      <div className="flex flex-row justify-center gap-4">
        <div id="div">
          <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
          <CartCheckout itens={cart} setItens={setCart} />
        </div>
        <div id="cart">
          <Cart itens={cart} setItens={setCart} />
        </div>
      </div>
    </div>

  );
}
