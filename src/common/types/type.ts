export enum userType {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STYLIST = 'STYLIST'
}

export enum QuizeTypes {
  FOR_MEN = "for-men",
  FOR_WOMEN = "for-women",
}

export type TypeFormField = {
  id: string;
  type: string;
  name: string;
  label: string;
  readonly?: boolean;
  options?: TypeSelectOption[];
};

export type TypeSelectOption = {
  title: string;
  value: string | number;
};