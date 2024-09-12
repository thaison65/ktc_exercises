class Category {
  private id: string;
  private name: string;
  private nameEnglish: string;

  constructor(id: string, name: string, nameEnglish: string) {
    this.id = id;
    this.name = name;
    this.nameEnglish = nameEnglish;
  }

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getNameEnglish(): string {
    return this.nameEnglish;
  }
}

export default Category;
