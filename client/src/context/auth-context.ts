import { createContext } from "react";

import { IAuthState } from "./auth-provider";

export interface IAuthContext extends IAuthState {
  addUser: (token: string) => void;
  removeUser: () => void;
}

const authContext = createContext<IAuthContext>({
  token: "",
  addUser: () => {},
  removeUser: () => {},
});

export default authContext;
