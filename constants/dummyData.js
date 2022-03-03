import { icons, images } from "./";

const myProfile = {
    name: "Jubert Goya",
    profile_image: images.profile,
    address: "Guayaquil"
}

const categories = [
    {
        id: 1,
        name: "Comida Rápida",
        icon: icons.burger
    },
    {
        id: 2,
        name: "Frutas",
        icon: icons.cherry
    },
    {
        id: 3,
        name: "Arroz",
        icon: icons.rice
    }
]

const hamburger = {
    id: 1,
    name: "Hamburguesa",
    description: "Hamburguesa de pollo",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Tacos",
    description: "Tortillas Mexicanas & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Vegetal Indio Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "Sandwich",
    description: "Sandwich a la parilla con vegetales",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png")
}

const menu = [
    {
        id: 1,
        name: "Destacado",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Cerca de ti",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 4,
        name: "Lo Nuevo",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recomendado",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },

]


export default {
    myProfile,
    categories,
    menu,
}