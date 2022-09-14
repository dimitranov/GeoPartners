export enum UserRoles {
  USER = "user",
  PIZZAR = "pizzar",
  ADMIN = "admin",
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationCredentials extends ILoginCredentials {
  name: string;
  passwordConfirm: string;
  role: UserRoles;
}

export interface IUserData {
  role: string;
  _id: string;
  name: string;
  email: string;
  __v: number;
}

export type IUserAuthData = {
  status: string;
  token: string;
  data: {
    user: IUserData;
  };
};
