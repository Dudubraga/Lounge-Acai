export type Sweetener = {
  id: string;
  image: any;
  price?: number;
};

const sweeteners: Sweetener[] = [
  { id: "Xarope", image: require("../assets/images/xarope.png") },
  { id: "Demerara", image: require("../assets/images/demerara.png") },
  { id: "Mascavo", image: require("../assets/images/mascavo.png") },
  { id: "Mel", image: require("../assets/images/mel.png") },
  { id: "Xilitol", image: require("../assets/images/xilitol.png") },
  { id: "Nenhum", image: require("../assets/images/none.png") },
];

export default sweeteners;