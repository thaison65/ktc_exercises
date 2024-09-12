"use strict";
class Drink {
    constructor(id, categoryId, name, price, nameEnglish, slug) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.price = price;
        this.nameEnglish = nameEnglish;
        this.slug = slug;
    }
    getId() {
        return this.id;
    }
    getCategoryId() {
        return this.categoryId;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getNameEnglish() {
        return this.nameEnglish;
    }
    getSlug() {
        return this.slug;
    }
}
