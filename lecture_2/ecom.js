let goods = [
    {
        id: 1,
        name: "Deniz Moda",
        description: "Кеды тренд 2023 демисезон",
        sizes: ["35", "36", "38", "39", "40"],
        price: 4510,
        available: true,
    },
    {
        id: 2,
        name: "Patersen",
        description: "Кроссовки женские",
        sizes: ["38", "39", "40"],
        price: 4810,
        available: true,
    },
    {
        id: 3,
        name: "BNB Original",
        description: "Кроссови женские",
        sizes: ["35", "36", "38", "39", "40", "41"],
        price: 1966,
        available: true,
    },
    {
        id: 4,
        name: "Converse",
        description: "Кеды",
        sizes: ["36", "38", "39", "40", "41"],
        price: 3556,
        available: false,
    },
    {
        id: 5,
        name: "LifeStile",
        description: "Кроссовки летние белые",
        sizes: ["35", "36", "38", "39", "40"],
        price: 1235,
        available: true,
    },
];

let basket = [
    {
        good: 1,
        amount: 1,
    },
    {
        good: 5,
        amount: 2,
    },
];


function addToBasket(good, amount) {
    let goodExists = goods.find(element => element.id == good && element.available == true);
    if (typeof goodExists == "undefined") {
        console.log('Товара нет в каталоге/недоступен для заказа!')
    } else {
        let basketUpdate = basket.find(item => item.good == good);
        if (typeof basketUpdate == "undefined") {
            basket.push({"good": Number(good), "amount": Number(amount)});
        } else {
            for (let object of basket) {
                if (object == basketUpdate) {
                    object.amount += Number(amount);
                    break;
                }
            }
        }
    }
    return basket;
}

// тест функции
// console.log(addToBasket(process.argv[2], process.argv[3]));


function deleteFromBasket(good) {
    const index = basket.findIndex(n => n.good == good);
    if (index !== -1) {
        basket.splice(index, 1);
    }
    return basket;
}

// тест функции
// console.log(deleteFromBasket(process.argv[2]));


function clearBasket() {
    basket.splice(0, basket.length);
    return basket;
}

// тест функции
// console.log(clearBasket());


function getTotalBasket() {
    let result = {
        totalAmount: basket.length,
        totalSumm: 0,
    };

    for (let item of basket) {
        result.totalSumm += goods.find(good => good.id == item.good)['price'] * item.amount;
    };

    return result;
}

// тест функции
// console.log(getTotalBasket());