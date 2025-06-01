export type Size = {
  id: string;
  accompaniments: number;
  image: any;
  price: number;
};

const sizes: Size[] = [
  {
    id: "200ml",
    accompaniments: 2,
    image: require("../assets/images/tamanho200ml.png"),
    price: 12.0,
  },
  {
    id: "300ml",
    accompaniments: 3,
    image: require("../assets/images/tamanho300ml.png"),
    price: 15.5,
  },
  {
    id: "400ml",
    accompaniments: 4,
    image: require("../assets/images/tamanho400ml.png"),
    price: 19.5,
  },
  {
    id: "500ml",
    accompaniments: 5,
    image: require("../assets/images/tamanho500ml.png"),
    price: 24.0,
  },
  {
    id: "750ml",
    accompaniments: 5,
    image: require("../assets/images/tamanho750ml.png"),
    price: 33.0,
  },
];

export default sizes;