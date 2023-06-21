import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { SessionInfo } from "../@types/Restaurant/user";
import { api } from "../service/apiClient";
import { SignInProps } from "../pages/SignIn";
import { useNavigate } from "react-router-dom";
import { useAppToast } from "../hooks/useAppToast";

type AuthContextDataProps = {
  signIn: (restaurantCredentials: SignInProps) => Promise<void>;
  restaurantSession: SessionInfo["user"] | null;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { handleRequestError } = useAppToast();
  const navigate = useNavigate();
  const [restaurantSession, setRestaurantSession] = useState<
    SessionInfo["user"] | null
  >(null);
  const [lastUserUpdate, setLastUserUpdate] = useState<Date>(new Date());
  const isAuthenticated = !!restaurantSession;

  useEffect(() => {
      const accessToken = Cookies.get("meu-garcom-web.token");
    if (accessToken) {
      api
        .get("/auth/restaurant-manager/me")
        .then((response) => {
          setLastUserUpdate(new Date());
          setRestaurantSession(response.data);
          navigate('/')
          console.log("ME =>", response.data);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  // async function refreshUser() {
  //   // TODO: criar setTimeOut para atualizar o usuário com o tempo para não gerar várias requests no /me
  //   console.log(user)
  //   const accessToken = Cookies.get('meu-garcom-web.token')
  //   const minutesFromLastUpdate = +differenceInMinutes(
  //     new Date(),
  //     lastUserUpdate,
  //   )
  //   if ((accessToken && minutesFromLastUpdate) || !!user) {
  //     console.log('inicou')
  //     try {
  //       const response = await api.get('/auth/restaurant-manager/me')
  //       setLastUserUpdate(new Date())
  //       setUser(response.data)
  //     } catch (error) {
  //       signOut()
  //     }
  //   }
  // }

  async function signIn(restaurantCredentials: SignInProps): Promise<void> {
    try {
      const response = await api.post("/auth/restaurant-manager/sign-in", {
        username: restaurantCredentials.username,
        password: restaurantCredentials.password,
      });
      const { accessToken, user } = response.data;
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setRestaurantSession(user);
      Cookies.set("meu-garcom-web.token", accessToken, {
        expires: 30,
        path: "/",
      });
    } catch (error) {
      handleRequestError(error);
      throw error;
    }
  }

  async function signOut() {
    Cookies.remove("meu-garcom-web.token");
    setRestaurantSession(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        restaurantSession,
        isAuthenticated,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

