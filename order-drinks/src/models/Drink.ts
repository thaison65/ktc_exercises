class Drink {
  private id: string;
  private categoryId: string;
  private name: string;
  private price: number;
  private nameEnglish: string;
  private slug: string;

  constructor(id: string, categoryId: string, name: string, price: number, nameEnglish: string, slug: string) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.price = price;
    this.nameEnglish = nameEnglish;
    this.slug = slug;
  }

  public getId(): string {
    return this.id;
  }

  public getCategoryId(): string {
    return this.categoryId;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getNameEnglish(): string {
    return this.nameEnglish;
  }

  public getSlug(): string {
    return this.slug;
  }
}
