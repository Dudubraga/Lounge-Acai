export type Fruit = {
    id: string;
    image: any;
    price?: number;
}

const fruits: Fruit[] = [
    { id: "Kiwi", image: require("../assets/images/kiwi.png"), price: 3.0 },
    { id: "Manga", image: require("../assets/images/manga.png"), price: 2.5 },
    { id: "Morango", image: require("../assets/images/morango.png"), price: 4.0 },
    { id: "Nenhuma", image: require("../assets/images/none.png"), price: 0.0 },
];

export default fruits;