export interface DrinkType {
  id: string;
  name: string;
  price: number;
  nameEnglish?: string;
  slug?: string;
  categoryId?: string;
}

export interface NewDrinkType extends DrinkType {
  quantity: number;
}
