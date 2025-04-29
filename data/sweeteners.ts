export type Sweetener = {
  id: string;
  image: any;
  price?: number;
};

const sweeteners: Sweetener[] = [
  { id: "Xarope", image: require("../assets/images/xarope.png"), price: 1.0 },
  { id: "Demerara", image: require("../assets/images/demerara.png"), price: 1.5 },
  { id: "Mascavo", image: require("../assets/images/mascavo.png"), price: 1.5 },
  { id: "Mel", image: require("../assets/images/mel.png"), price: 2.0 },
  { id: "Xilitol", image: require("../assets/images/xilitol.png"), price: 2.5 },
  { id: "Nenhum", image: require("../assets/images/none.png"), price: 0.0 },
];

export default sweeteners;