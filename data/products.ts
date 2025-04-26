export type Product = {
  id: string;
  image: any;
  price?: number;
  size?: string;
};

const products: Product[] = [
    { id: "Açaí", image: require("../assets/images/acai.png") },
    { id: "Cupuaçu", image: require("../assets/images/cupuacu.png") },
    { id: "Cupuaçu e Açaí", image: require("../assets/images/acai-cupuacu.png") },
    { id: "Suco de Açaí", image: require("../assets/images/suco.png"), price: 13.0, size: "500ml" },
    { id: "Vitamina de Açaí", image: require("../assets/images/vitamina.png"), price: 15.0, size: "500ml" },
];

export default products;