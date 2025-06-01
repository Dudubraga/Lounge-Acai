export type ProductSize = 200 | 300 | 400 | 500 | 750;

export interface ProductPrice {
  size: ProductSize;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  type: "acai" | "cupuaçu" | "suco" | "vitamina" | "meio-a-meio";
  sweetener?: "sem-acucar" | "xarope" | "xilitol" | "demerara" | "mascavo" | "mel";
  prices: ProductPrice[];
}

export interface SideOption {
  id: string;
  name: string;
  extraPrice?: number;
}

export const products: Product[] = [
  {
    id: "acai-xarope",
    name: "Açaí Puro com Xarope",
    prices: [
      { size: 200, price: 12 },
      { size: 300, price: 15.5 },
      { size: 400, price: 19.5 },
      { size: 500, price: 24 },
      { size: 750, price: 33 },
    ],
    type: "acai",
    sweetener: "xarope",
  },
  {
    id: "acai-demerara",
    name: "Açaí Puro com Demerara",
    prices: [
      { size: 200, price: 14 },
      { size: 300, price: 17 },
      { size: 400, price: 21 },
      { size: 500, price: 26 },
      { size: 750, price: 34.5 },
    ],
    type: "acai",
    sweetener: "demerara",
  },
  {
    id: "acai-mascavo",
    name: "Açaí Puro com Mascavo",
    prices: [
      { size: 200, price: 16 },
      { size: 300, price: 19 },
      { size: 400, price: 22.5 },
      { size: 500, price: 28 },
      { size: 750, price: 37 },
    ],
    type: "acai",
    sweetener: "mascavo",
  },
  {
    id: "acai-mel",
    name: "Açaí Puro com Mel",
    prices: [
      { size: 200, price: 16 },
      { size: 300, price: 19 },
      { size: 400, price: 22.5 },
      { size: 500, price: 28 },
      { size: 750, price: 37 },
    ],
    type: "acai",
    sweetener: "mel",
  },
  {
    id: "acai-sem-acucar",
    name: "Açaí Puro Sem Açúcar",
    prices: [
      { size: 200, price: 15 },
      { size: 300, price: 18.5 },
      { size: 400, price: 22 },
      { size: 500, price: 25.5 },
      { size: 750, price: 33 },
    ],
    type: "acai",
    sweetener: "sem-acucar",
  },
  {
    id: "acai-xilitol",
    name: "Açaí Puro com Xilitol",
    prices: [
      { size: 200, price: 19.5 },
      { size: 300, price: 22 },
      { size: 400, price: 26.5 },
      { size: 500, price: 31 },
      { size: 750, price: 40 },
    ],
    type: "acai",
    sweetener: "xilitol",
  },
  {
    id: "cupuacu",
    name: "Cupuaçu",
    prices: [
      { size: 200, price: 15.5 },
      { size: 300, price: 19 },
      { size: 400, price: 22.5 },
      { size: 500, price: 26 },
      { size: 750, price: 34.5 },
    ],
    type: "cupuaçu",
  },
  {
    id: "meio-a-meio",
    name: "1/2 Açaí 1/2 Cupuaçu",
    prices: [
      { size: 200, price: 12 },
      { size: 300, price: 15.5 },
      { size: 400, price: 19.5 },
      { size: 500, price: 24 },
      { size: 750, price: 33 },
    ],
    type: "meio-a-meio",
  },
  {
    id: "suco-acai",
    name: "Suco de Açaí ou Cupuaçu",
    prices: [{ size: 500, price: 13 }],
    type: "suco",
  },
  {
    id: "vitamina-acai",
    name: "Vitamina de Açaí ou Cupuaçu",
    prices: [{ size: 500, price: 15 }],
    type: "vitamina",
  },
];

export const sideOptions: SideOption[] = [
  { id: "granola", name: "Granola" },
  { id: "amendoim-triturado", name: "Amendoim triturado" },
  { id: "sucrilhos", name: "Sucrilhos" },
  { id: "farinha-amendoim", name: "Farinha de Amendoim" },
  { id: "leite-po", name: "Leite em Pó" },
  { id: "farinha-lactea", name: "Farinha Láctea" },
  { id: "farinha-castanha", name: "Farinha de Castanha" },
  { id: "amendoim", name: "Amendoim" },
  { id: "mel", name: "Mel" },
  { id: "bolinha-nescau", name: "Bolinha de Nescau" },
  { id: "aveia", name: "Aveia" },
];

export const extraFruits: SideOption[] = [
  { id: "morango", name: "Morango", extraPrice: 4 },
  { id: "manga", name: "Manga", extraPrice: 4 },
  { id: "kiwi", name: "Kiwi", extraPrice: 4 },
];