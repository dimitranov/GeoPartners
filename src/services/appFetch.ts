import { IUserAuthData, IUserData } from "../types/authTypes";
import axios from "axios";
import { AuthService } from "./authService";

export enum ReqType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const failterRequestAttempt = (message: string) => {
  return new Promise((res, rej) => rej(message));
};

export const appFetch = (
  method: ReqType,
  URL: string,
  data?: any,
  withAuth?: boolean
): Promise<unknown> => {
  let headers;
  if (withAuth) {
    const userObj = AuthService.getToken() as IUserAuthData;

    if (!userObj) return failterRequestAttempt("Unothorized");

    headers = {
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    };
  }

  switch (method) {
    case ReqType.GET:
      return axios.get(URL, headers);
    case ReqType.POST: {
      if (!data) return failterRequestAttempt("No data in body - fix request");
      return axios.post(URL, data, headers);
    }
    case ReqType.PATCH: {
      if (!data) return failterRequestAttempt("No data in body - fix request");
      return axios.patch(URL, data, headers);
    }
    case ReqType.DELETE:
      return axios.delete(URL, headers);
    default:
      return failterRequestAttempt("Failed to use appFetch properly");
  }
};
