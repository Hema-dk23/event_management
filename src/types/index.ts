export interface IListItem {
    id: number,
    title: string,
    description: string,
    startdatetime : string,
    enddatetime : string,
    image_path: string,
    price: number,
    price_unit : string
    location: string,
    category_id: number
  }

  export interface IUser {
    id: number;
    name: string;
    role: string;
  }

  export interface ICategory {
    key: string;
    value: string;
  }