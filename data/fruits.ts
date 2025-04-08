export type Fruit = {
    id: string;
    name: string;
    image: any; // Use `any` for now since React Native images are imported dynamically
}

const fruits: Fruit[] = [
    { id: "morango", name: "Morango", image: require("../assets/images/morango.png") },
    { id: "kiwi", name: "Kiwi", image: require("../assets/images/kiwi.png") },
    { id: "manga", name: "Manga", image: require("../assets/images/manga.png") },
    { id: "none", name: "None", image: require("../assets/images/none.png") },
];

export default fruits;