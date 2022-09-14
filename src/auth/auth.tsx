import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/authService";
import { IUserAuthData, IUserData } from "../types/authTypes";

export enum UserRole {
  USER = "user",
  PIZZAR = "pizzar",
  ADMIN = "admin",
  NONE = "none",
}

export interface IAuthContext {
  user: IUserAuthData | boolean;
  loading: boolean;
  setLoading: (status: boolean) => void;
  signin: (userdata: IUserAuthData | boolean) => Promise<unknown>;
  signout: () => Promise<unknown>;
  userRole: UserRole;
}

const authInitialValue: IAuthContext = {
  user: false,
  loading: true,
  setLoading: (status: boolean) => {},
  signin: (userData: IUserAuthData | boolean) => new Promise(() => {}),
  signout: () => new Promise(() => {}),
  userRole: UserRole.NONE,
};

export const AuthContext = createContext<IAuthContext>(authInitialValue);

export const useAuth = () => {
  return useContext<IAuthContext>(AuthContext);
};

export function useProvideAuth(): IAuthContext {
  const [user, setUser] = useState<IUserAuthData | boolean>(
    authInitialValue.user
  );
  const [loading, setIsLoading] = useState<boolean>(authInitialValue.loading);

  const signin = (userData: IUserAuthData | boolean) => {
    return new Promise((res, rej) => {
      AuthService.saveToken(userData as IUserAuthData);
      setUser(userData);
      res(null);
    });
  };

  const signout = () => {
    return new Promise((res, rej) => {
      AuthService.deleteToken();
      setUser(false);
      res(null);
    });
  };

  const setLoading = (status: boolean) => {
    setIsLoading(status);
  };

  const userRole = !user
    ? UserRole.NONE
    : ((
        user as {
          status: string;
          token: string;
          data: {
            user: IUserData;
          };
        }
      ).data.user.role as UserRole);

  return {
    user,
    loading,
    setLoading,
    signin,
    signout,
    userRole,
  };
}

export const AuthProvider = ({ children }: { children: React.ReactChild }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const PrivateLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const user = useAuth();
  if (user.user) return <Link to={to}>{children}</Link>;
  return null;
};

export const getUserRole = (auth: IAuthContext): UserRole => {
  if (!auth.user) return UserRole.NONE;
  return (
    (auth as IAuthContext).user as {
      status: string;
      token: string;
      data: {
        user: IUserData;
      };
    }
  ).data.user.role as UserRole;
};
