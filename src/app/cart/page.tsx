'use client'

import Cart from "@/components/cart";
import { IProduct } from "@/interfaces/Produto";
import { useEffect, useState } from "react";

const itensMock = [
  {
    id: "1",
    name: "Item 1",
    description: "Descrição do item 1",
    value: 10.00,
    isChecked: false,
  },
  {
    id: "2",
    name: "Item 2",
    description: "Descrição do item 2",
    value: 20.00,
    isChecked: false,
  },
  {
    id: "3",
    name: "Item 3",
    description: "Descrição do item 3",
    value: 30.00,
    isChecked: false,
  },
  {
    id: "4",
    name: "Item 4",
    description: "Descrição do item 4",
    value: 40.00,
    isChecked: false,
  },
  {
    id: "5",
    name: "Item 5",
    description: "Descrição do item 5",
    value: 50.00,
    isChecked: false,
  },
  {
    id: "6",
    name: "Item 6",
    description: "Descrição do item 6",
    value: 60.00,
    isChecked: false,
  },
  {
    id: "7",
    name: "Item 7",
    description: "Descrição do item 7",
    value: 70.00,
    isChecked: false,
  },
  {
    id: "8",
    name: "Item 8",
    description: "Descrição do item 8",
    value: 80.00,
    isChecked: false,
  },
  {
    id: "9",
    name: "Item 9",
    description: "Descrição do item 9",
    value: 90.00,
    isChecked: false,
  },
  {
    id: "10",
    name: "Item 10",
    description: "Descrição do item 10",
    value: 100.00,
    isChecked: false,
  },
] as IProduct[];

export default function Home() {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [itens, setItens] = useState<IProduct[]>([]);

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((i) => i.id !== id));
    setItens(itens.map((i) => {
      if (i.id === id) {
        return { ...i, isChecked: false };
      }
      return i;
    }
    ));
  };

  useEffect(() => {
    setItens(itensMock);
   }, []);

  return (
    <main className="grid grid-cols-5">
      <div className="col-span-4 flex min-h-screen flex-col items-center gap-16 p-24 ">
        <h1 className="text-3xl font-bold">Loja</h1>
        <Cart itens={cart} />
      </div>
    </main>
  );
}
