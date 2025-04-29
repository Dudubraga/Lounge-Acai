export type SideDish = {
  id: string;
  price?: number;
};

const sideDishes: SideDish[] = [
  { id: "Amendoim", price: 1.0 },
  { id: "Amendoim Triturado", price: 1.2 },
  { id: "Aveia", price: 0.8 },
  { id: "Banana", price: 1.5 },
  { id: "Bolinhas de Nescau", price: 2.0 },
  { id: "Farinha Láctea" , price: 1.5},
  { id: "Farinha de Amendoim", price: 1.2 },
  { id: "Farinha de Castanha", price: 2.0 },
  { id: "Granola", price: 1.8 },
  { id: "Leite Condensado", price: 2.5 },
  { id: "Leite em Pó", price: 1.5 },
  { id: "Mel", price: 2.0 },
  { id: "Sucrilhos", price: 1.8 },
];

export default sideDishes;