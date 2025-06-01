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
  available: boolean;
}

export interface SideOption {
  id: string;
  name: string;
  extraPrice?: number;
  available: boolean;
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
    available: true,
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
    available: true,
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
    available: true,
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
    available: true,
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
    available: true,
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
    available: true,
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
    available: true,
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
    available: true,
  },
  {
    id: "suco-acai",
    name: "Suco de Açaí ou Cupuaçu",
    prices: [{ size: 500, price: 13 }],
    type: "suco",
    available: true,
  },
  {
    id: "vitamina-acai",
    name: "Vitamina de Açaí ou Cupuaçu",
    prices: [{ size: 500, price: 15 }],
    type: "vitamina",
    available: true,
  },
];

export const sideOptions: SideOption[] = [
  { id: "granola", name: "Granola", available: true },
  { id: "amendoim-triturado", name: "Amendoim triturado", available: true },
  { id: "sucrilhos", name: "Sucrilhos", available: true },
  { id: "farinha-amendoim", name: "Farinha de Amendoim", available: true },
  { id: "leite-po", name: "Leite em Pó", available: true },
  { id: "farinha-lactea", name: "Farinha Láctea", available: true },
  { id: "farinha-castanha", name: "Farinha de Castanha", available: true },
  { id: "amendoim", name: "Amendoim", available: true },
  { id: "mel", name: "Mel", available: true },
  { id: "bolinha-nescau", name: "Bolinha de Nescau", available: true },
  { id: "aveia", name: "Aveia", available: true },
];

export const extraFruits: SideOption[] = [
  { id: "morango", name: "Morango", extraPrice: 4, available: true },
  { id: "manga", name: "Manga", extraPrice: 4, available: true },
  { id: "kiwi", name: "Kiwi", extraPrice: 4, available: true },
];