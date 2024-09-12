class Category {
    constructor(id, name, nameEnglish) {
        this.id = id;
        this.name = name;
        this.nameEnglish = nameEnglish;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNameEnglish() {
        return this.nameEnglish;
    }
}
export default Category;
