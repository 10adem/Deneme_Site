import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User, WeakPassword } from '@supabase/supabase-js';

// AuthContext için tip tanımı
export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User; session: Session; weakPassword?: WeakPassword } | void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Varsayılan değerler
const defaultContext: AuthContextType = {
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false
};

const AuthContext = createContext<AuthContextType>(defaultContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mevcut oturumu kontrol et
    const getSession = async () => {
      setLoading(true);
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Oturum alınamadı:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Oturum değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Giriş fonksiyonu
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Oturum süresini 8 saat ile sınırla
      setTimeout(() => {
        logout();
      }, 8 * 60 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('Giriş hatası:', error);
      throw error;
    }
  };

  // Çıkış fonksiyonu
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Yerel depolama temizliği
      localStorage.removeItem('supabase.auth.token');
      // Durum güncelleme
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 