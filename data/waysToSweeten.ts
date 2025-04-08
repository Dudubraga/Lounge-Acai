export type Sweetener = {
  id: string;
  name: string;
  image: any; // Use `any` for now since React Native images are imported dynamically
};

const sweeteners: Sweetener[] = [
  { id: "xarope", name: "Xarope", image: require("../assets/images/xarope.png") },
  { id: "demerara", name: "Demerara", image: require("../assets/images/demerara.png") },
  { id: "mascavo", name: "Mascavo", image: require("../assets/images/mascavo.png") },
  { id: "mel", name: "Mel", image: require("../assets/images/mel.png") },
  { id: "xilitol", name: "Xilitol", image: require("../assets/images/xilitol.png") },
  { id: "none", name: "None", image: require("../assets/images/none.png") },
];

export default sweeteners;