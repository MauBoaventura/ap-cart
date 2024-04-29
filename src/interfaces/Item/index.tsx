import { IProduct } from "../Produto";

export interface IItem {
    id: string;
    product: IProduct;
    quant: number;
  }