import { create } from 'zustand';

type Role = 'admin' | 'sales' | 'content' | 'finance';

interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  tenantId: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  hasPermission: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  hasPermission: (role) => {
    const user = get().user;
    return user?.roles.includes(role) || user?.roles.includes('admin') || false;
  },
}));