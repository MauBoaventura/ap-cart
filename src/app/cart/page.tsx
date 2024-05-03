'use client'

import CartCheckout from "@/components/cartCheckout";
import CartSideCheckout from "@/components/cartSideCheckout";
import { IItem, IItemCheckout } from "@/interfaces/Item";
import { useEffect, useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<IItemCheckout[]>([]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }

  }, []);
  const handleRemoveAllFromCart = () => {
    setCart([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
  }

  const handleSelectAll = () => {
    const resp = cart.map((i) => {
      return { ...i, isChecked: true };
    });
    setCart(resp);
  }
  const handleUnselectAll = () => {
    const resp = cart.map((i) => {
      return { ...i, isChecked: false };
    });
    setCart(resp);
  }

  const allItemsChecked = cart.every((item) => item.isChecked);

  return (
    <div className="flex justify-center items-center" >
      <div className="grid grid-cols-6 w-[1180px] m-6 gap-4" >
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-slate-100 rounded-lg p-4">
            <div className=" mx-2">
              <div className="flex flex-row justify-between bg-slate-100 rounded-lg">
                <h1 className="text-2xl font-bold my-2">Carrinho de Compras</h1>
                <div className="text-sm font-bold my-2 bg-red-200 hover:bg-red-400 cursor-pointer p-2 rounded-lg" onClick={handleRemoveAllFromCart}>Limpar</div>
              </div>
              <div className="flex flex-row bg-slate-100 rounded-lg">
                <input type="radio" className="mr-1" checked={allItemsChecked} onClick={allItemsChecked ? handleUnselectAll : handleSelectAll} />
                <div className="text-sm font-bold cursor-pointer p-2 rounded-lg" onClick={allItemsChecked ? handleUnselectAll : handleSelectAll}>{allItemsChecked ? 'Desmarcar':  `Selecionar`} tudo</div>
              </div>
              <h3>{cart.filter((value) => value.isChecked).length} itens selecionados</h3>
            </div>
            <CartCheckout itens={cart} setItens={setCart} />
          </div>
          {/* <div className="bg-slate-100 rounded-lg p-4">
            Outra coisa
          </div> */}
        </div>
        <div className="col-span-2 bg-gray-200">
          <CartSideCheckout itens={cart} setItens={setCart} />
        </div>
      </div>
    </div>

  );
}
