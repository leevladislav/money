export interface CategoryCreateParams {
  name: string;
  image?: File;
}

export interface CategoryUpdateParams {
  id: string;
  name: string;
  image?: File;
}

export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}
