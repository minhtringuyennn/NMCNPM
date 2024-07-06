import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(
  devtools((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },
    clearUser: () => {
      localStorage.removeItem("user");
      set({ user: null });
    }
  }))
);

export default useUserStore;
