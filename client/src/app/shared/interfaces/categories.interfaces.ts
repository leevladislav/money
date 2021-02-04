export interface CategoryCreateParams {
  name: string;
  iconName: string;
}

export interface CategoryUpdateParams {
  id: string;
  name: string;
  iconName: string;
}

export interface Category {
  name: string;
  iconName: string;
  user?: string;
  _id?: string;
}
