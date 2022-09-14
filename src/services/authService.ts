import {
  ILoginCredentials,
  IRegistrationCredentials,
  IUserAuthData,
} from "../types/authTypes";
import { appFetch, ReqType } from "./appFetch";
import { API_SIGNUP_PATH, API_SIGNIN_PATH } from "./urlHelper";

export class AuthService {
  private static sanitizeSignInData(data: ILoginCredentials) {
    return {
      email: data.email,
      password: data.password,
    };
  }

  private static sanitizeSignUpData(data: IRegistrationCredentials) {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      role: data.role,
    };
  }

  //send the registration data via axios to the node server and recive the token returned or the error message
  public static register(data: IRegistrationCredentials): Promise<any> {
    return appFetch(
      ReqType.POST,
      API_SIGNUP_PATH,
      AuthService.sanitizeSignUpData(data)
    );
  }

  // send the login data to the server and handle the token or  errors
  public static login(data: ILoginCredentials): Promise<any> {
    return appFetch(
      ReqType.POST,
      API_SIGNIN_PATH,
      AuthService.sanitizeSignInData(data)
    );
  }

  public static saveToken(data: IUserAuthData) {
    if (!AuthService.getToken()) {
      sessionStorage.setItem("token", JSON.stringify(data));
    }
  }

  public static getToken(): IUserAuthData | boolean {
    const data = sessionStorage.getItem("token");
    if (data) {
      return JSON.parse(data) as IUserAuthData;
    }
    return false;
  }

  public static deleteToken() {
    sessionStorage.removeItem("token");
  }
}
