export type Fruit = {
    id: string;
    image: any;
    price?: number;
}

const fruits: Fruit[] = [
    { id: "Kiwi", image: require("../assets/images/kiwi.png") },
    { id: "Manga", image: require("../assets/images/manga.png") },
    { id: "Morango", image: require("../assets/images/morango.png") },
    { id: "Nenhuma", image: require("../assets/images/none.png") },
];

export default fruits;