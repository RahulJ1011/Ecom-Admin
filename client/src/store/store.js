// store.js
import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  getToken: () => get().token,
  resetToken: () => set({ token: null }),
  userId: null,
  setUserId: (newUserId) => set({ userId: newUserId }),
  getUserId: () => get().userId,
  id: null,
  setId: (newId) => set({ id: newId }),
  getId: () => get().id,
}));

export default useAuthStore;
