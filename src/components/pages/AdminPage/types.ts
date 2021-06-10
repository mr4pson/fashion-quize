export type TypeAuthLogin = {
  access_token: string;
  refresh_token: string;
};

export type TypeUser = {
  login: string;
  password: string;
}

export type TypeAuthLoginResponse = {
  error?: LoginError;
};

export type TypeUseAuthHookResult = {
  loading: boolean;
  login: (user: TypeUser) => Promise<TypeAuthLoginResponse>;
  logout: () => void;
}

export enum LoginError {
  MISSING_FIELDS = 'MISSING_FIELDS',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  ACCOUNT_BLOCKED = 'ACCOUNT_BLOCKED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  DEACTIVATED_USER = 'DEACTIVATED_USER',
  RESET_REQUIRED = 'RESET_REQUIRED',
}

export enum PageMetods {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

export enum ControlType {
  INPUT = "INPUT",
  FILE = "FILE",
  RADIO = "RADIO",
  SELECT = "SELECT",
  TEXTAREA = "TEXTAREA",
  BUTTON = "BUTTON",
}

export type TypeSelectOption = {
  title: string;
  value: string | number;
}