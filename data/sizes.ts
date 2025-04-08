export type Size = {
  id: string;
  volume: string; // "200ml"
  accompaniments: number; // nº de acompanhamentos
  price: number; // a partir de R$
  image: any; // imagem
};

const sizes: Size[] = [
  {
    id: "200ml",
    volume: "200ml",
    accompaniments: 2,
    price: 12.0,
    image: require("../assets/images/tamanho200ml.png"),
  },
  {
    id: "300ml",
    volume: "300ml",
    accompaniments: 3,
    price: 15.5,
    image: require("../assets/images/tamanho300ml.png"),
  },
  {
    id: "400ml",
    volume: "400ml",
    accompaniments: 4,
    price: 19.5,
    image: require("../assets/images/tamanho400ml.png"),
  },
  {
    id: "500ml",
    volume: "500ml",
    accompaniments: 5,
    price: 24.0,
    image: require("../assets/images/tamanho500ml.png"),
  },
  {
    id: "750ml",
    volume: "750ml",
    accompaniments: 5,
    price: 33.0,
    image: require("../assets/images/tamanho750ml.png"),
  },
];

export default sizes;