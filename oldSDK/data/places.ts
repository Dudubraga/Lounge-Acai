export type Place = {
    id: string;
    image: any;
    price: number;
}

const fruits: Place[] = [
    { id: "Local", image: require("../assets/images/local.png"), price: 0 },
    { id: "Viagem", image: require("../assets/images/viagem.png"), price: 1.5 },
];

export default fruits;