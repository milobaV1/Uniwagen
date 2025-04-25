import { User } from "@/services/interfaces/user.interface";
import { createJSONStorage, StateStorage, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";

export type DecodedToken = {
  email?: string;
  sub: {
    id: string;
  };
  iat: number;
  exp: number;
};

export type AuthState = {
  authToken?: string;
  decodedDto?: DecodedToken;
  user?: User;
};

export type AuthActions = {
  setUser: (user: User) => void;
  setAuthToken: (authToken: string) => void;
  setDecodedToken: (dto?: DecodedToken) => void;
  logOut: () => void;
};

const authStorage: StateStorage = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : "false";
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

const initializer: StateCreator<AuthState & AuthActions> = (set) => ({
  decodedDto: undefined,
  setAuthToken: (authToken: string) => set({ authToken }),
  setDecodedToken: (dto?: DecodedToken) => set({ decodedDto: dto }),
  setUser: (user: User) => set({ user: user }),
  logOut: () =>
    set({ authToken: undefined, decodedDto: undefined, user: undefined }),
});

const persistedAuthState = persist<AuthState & AuthActions>(initializer, {
  name: "app-auth",
  storage: createJSONStorage(() => authStorage),
});

export const useAuthState = create<
  AuthState & AuthActions,
  [["zustand/persist", AuthState & AuthActions]]
>(persistedAuthState);
