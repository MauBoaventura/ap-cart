import { IProduct } from "../Produto";

export interface IItem {
    id: string;
    product: IProduct;
    quant: number;
  }
export interface IItemCheckout {
    id: string;
    product: IProduct;
    quant: number;
    isChecked: boolean;
  }