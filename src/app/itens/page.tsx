'use client'

import Cart from "@/components/cart";
import ArrayDeObjetos from "@/components/visualizeArray";
import { IItem } from "@/interfaces/Item";
import { IProduct } from "@/interfaces/Produto";
import Image from "next/image";
import { useEffect, useState } from "react";

const productsMock = [
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
  const [cart, setCart] = useState<IItem[]>([]);
  const [itens, setItens] = useState<IItem[]>([]);

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

  const handleRemoveFromCart = (id: string) => {
    // setCart(cart.filter((i) => i.id !== id));
    // setItens(itens.map((i) => {
    //   if (i.id === id) {
    //     return { ...i, isChecked: false ,};
    //   }
    //   return i;
    // }
    // ));
    // localStorage.setItem('cartItems', JSON.stringify(cart.filter((i) => i.id !== id)));
  };

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
    setItens(productsMock.map((product) => {
      return {
        id: product.id,
        product: product,
        quant: 1,
      };
    }));
  }, []);

  return (
    <main className="grid grid-cols-5">
      <div className="col-span-4 flex min-h-screen flex-col items-center gap-16 p-24 ">
        <h1 className="text-3xl font-bold">Loja</h1>
        <div className="mb-32 grid gap-2 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          {itens.map((item, index) => (

            <div key={index} className="group rounded-lg border-2 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <h2 className="mb-3 text-2xl font-semibold">
                {item.product.name}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {`R$ ${item.product.value.toFixed(2)}`}
              </p>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {`${item.product.description}`}
              </p>
              {item.product.isChecked ? (
                <a
                  className="flex items-center justify-center gap-2 mt-4 hover:underline"
                  href="#"
                  rel="noopener noreferrer"
                  onClick={() => handleRemoveFromCart(item.product.id)}
                >
                  <Image
                    className="rounded-full"
                    alt="Next.js Logo"
                    src='cart-remove.svg'
                    width={25}
                    height={25}
                    fill={false}
                  />
                  <p className="m-0 max-w-[30ch] text-sm opacity-50">
                    Remover do carrinho
                  </p>
                </a>
              ) : (
                <a
                  className="flex items-center justify-center gap-2 mt-4 hover:underline"
                  href="#"
                  rel="noopener noreferrer"
                  onClick={() => handleAddToCart(item.product)}
                >
                  <Image
                    className="rounded-full"
                    alt="Next.js Logo"
                    src='cart-add.svg'
                    width={25}
                    height={25}
                    fill={false}
                  />
                  <p className="m-0 max-w-[30ch] text-sm opacity-50">
                    Adicionar ao carrinho
                  </p>
                </a>
              )}
            </div>
          ))}

        </div>
      </div>
      <div className="col-span-1 bg-gray-200">
        {/* <Cart itens={cart} /> */}
        <ArrayDeObjetos arrayDeObjetos={cart} />
      </div>
    </main>
  );
}
