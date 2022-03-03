const screens = {
    main_layout: "MainLayout",
    home: "Home",
    search: "Buscar",
    cart: "Carrito",
    favourite: "Favorito",
    notification: "Notificacion",
    my_wallet: "Billetera"
}

const bottom_tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
        id: 1,
        label: screens.search,
    },
    {
        id: 2,
        label: screens.cart,
    },
    {
        id: 3,
        label: screens.favourite,
    },
    {
        id: 4,
        label: screens.notification,
    },
]

const delivery_time = [
    {
        id: 1,
        label: "10 Mins",
    },
    {
        id: 2,
        label: "20 Mins"
    },
    {
        id: 3,
        label: "30 Mins"
    }
]

const ratings = [
    {
        id: 1,
        label: 1,
    },
    {
        id: 2,
        label: 2,
    },
    {
        id: 3,
        label: 3,
    },
    {
        id: 4,
        label: 4,
    },
    {
        id: 5,
        label: 5,
    }
]

const tags = [
    {
        id: 1,
        label: "Hamburguesas"
    },
    {
        id: 2,
        label: "Comida Rápida"
    },
    {
        id: 3,
        label: "Pizza"
    },
    {
        id: 4,
        label: "Asiatico"
    },
    {
        id: 5,
        label: "Postres"
    },
    {
        id: 6,
        label: "Desayunos"
    },
    {
        id: 7,
        label: "Vegetales"
    },
    {
        id: 8,
        label: "Tacos"
    }
]

export default {
    screens,
    bottom_tabs,
    delivery_time,
    ratings,
    tags
}