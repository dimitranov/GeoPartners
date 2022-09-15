import { useEffect } from "react";
import { useAuth } from "../auth/auth";
import { AuthService } from "../services/authService";
import { IUserAuthData } from "../types/authTypes";

export const useAppSession = () => {
  const auth = useAuth();

  useEffect(() => {
    const userData: IUserAuthData | boolean = AuthService.getToken();

    if (userData && !auth.user) {
      auth
      .signin(userData)
      .then(() => auth.setLoading(false));
    } else if (!userData) {
      auth.setLoading(false);
    }
  }, [auth]);
};
