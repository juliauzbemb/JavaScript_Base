class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable (value) {
        this.available = value;
    }
}

class GoodsList {

    #goods;

    constructor(filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        // фильтрация
        const finalList = this.#goods.filter((value) => this.filter.test(value.name));
        // сортировка
        if (this.sortPrice) {
            if (this.sortDir) {
                return finalList.sort((a, b) => (a.price - b.price));
            } else {
                return finalList.sort((a, b) => (b.price - a.price));
            }
        } else {
            return finalList;
        }
    }

    add (good) {
        this.#goods.push(good);
    }

    remove(id) {
        const getIndex = this.#goods.findIndex(good => good.id === id);
        if (getIndex != undefined) {
            this.#goods.splice(getIndex, 1);
        }
        return getIndex;
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    get totalAmount() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0);
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0);
    }

    add(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            let newBasketItem = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(newBasketItem);
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        } else {
            console.log(`Не найден товар с id = ${good.id}`)
        }
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        function checkavailable(good) {
            if (good.available === true) {
                return good;
            }
        }
       this.goods = this.goods.filter(checkavailable);
    }
}

// создание экземпляров класса Goods
const test1 = new Good(1, "брюки женские", "description good1", ["S", "M", "L"], 1000, true);
const test2 = new Good(2, "брюки мужские", "description good2", ["S", "M"], 2030, true);
const test3 = new Good(3, "туфли женские", "description good3", ["S", "M", "XL"], 3408, true);
const test4 = new Good(4, "туфли мужские", "description good4", ["S", "XL"], 5000, true);
const test5 = new Good(5, "футболка женская", "description good5", ["L", "XL"], 4000, true);

// изменение доступности товара
test2.setAvailable(false);
// console.log(test2);

// создание экземпляра класса GoodsList
const catalog = new GoodsList(/муж/i, true, false);

// добавление товаров в каталог
catalog.add(test1)
catalog.add(test2);
catalog.add(test3);
catalog.add(test4);
catalog.add(test5);

// проверка работы метода get list()
// console.log(catalog.list);

// изменение параметров фильтрации и сортировки
catalog.filter = /жен/i;
catalog.sortPrice = false;
catalog.sortDir = false;
// console.log(catalog.list);

catalog.sortPrice = true;
catalog.sortDir = true;
// console.log(catalog.list);

// создание корзины
const basket = new Basket();

// проверка реализации метода add(good, amount) - добавление товаров в корзину
basket.add(test1, 1);
basket.add(test3, 2);
basket.add(test4, 2);
basket.add(test5, 4);

// проверка работы геттеров totalAmount() и totalSum()
// console.log(`Общее количество товаров в корзине - ${basket.totalAmount} на сумму ${basket.totalSum} рублей`);

// удаление/изменение количества товаров в корзине - метод remove(good, amount)
basket.remove(test1, 1);
basket.remove(test5, 2);
// console.log(basket);

// удаление из корзины недоступных товаров
basket.add(test2);
// console.log(basket);
basket.removeUnavailable();
// console.log(basket);

// очистка корзины
basket.clear();
// console.log(basket);