import { TokenType } from "./constants";

export const userSession = () => {
  try {
    const token = localStorage.getItem(TokenType.ACCESSS);
    return { token, status: !!token };
  } catch (error) {
    return { token: null, status: false };
  }
};

export const logOut = () => {
  try {
    localStorage.clear();
    window.location.reload();
  } catch (error) {
    console.error("Failed to log out:", error);
  }
};
