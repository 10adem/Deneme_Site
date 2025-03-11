import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
// Varsayılan değerler
const defaultContext = {
    user: null,
    session: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    isAuthenticated: false
};
const AuthContext = createContext(defaultContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
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
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    // Giriş fonksiyonu
    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw error;
            // Oturum süresini 8 saat ile sınırla
            setTimeout(() => {
                logout();
            }, 8 * 60 * 60 * 1000);
            return data;
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Çıkış hatası:', error);
        }
    };
    const value = {
        user,
        session,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
