export type Product = {
  id: string;
  name: string;
  image: any; // Use `any` for now since React Native images are imported dynamically
};

const products: Product[] = [
    { id: "acai", name: "Açaí", image: require("../assets/images/acai.png") },
    { id: "cupuaçu", name: "Cupuaçu", image: require("../assets/images/cupuacu.png") },
    { id: "acai-cupuacu", name: "Cupuaçu e açaí", image: require("../assets/images/acai-cupuacu.png") },
    { id: "suco", name: "Suco de açaí", image: require("../assets/images/suco.png") },
    { id: "vitamina", name: "Vitamina de açaí", image: require("../assets/images/vitamina.png") },
];

export default products;