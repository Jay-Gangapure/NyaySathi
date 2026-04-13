import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "mr";

export interface User {
  id: string;
  name: string;
  email: string;
  language: Language;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, language: Language) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const LANGUAGES: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

export const languageLabels = LANGUAGES;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const storedUser = localStorage.getItem("nyaysathi_user");
    const storedLang = localStorage.getItem("nyaysathi_lang") as Language | null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedLang) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("nyaysathi_lang", lang);
    if (user) {
      const updated = { ...user, language: lang };
      setUser(updated);
      localStorage.setItem("nyaysathi_user", JSON.stringify(updated));
    }
  };

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock authentication
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      id: "usr_001",
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email,
      language: language,
      avatar: undefined,
    };
    setUser(mockUser);
    localStorage.setItem("nyaysathi_user", JSON.stringify(mockUser));
    return true;
  };

  const signup = async (
    name: string,
    email: string,
    _password: string,
    lang: Language
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      id: "usr_001",
      name,
      email,
      language: lang,
    };
    setUser(mockUser);
    setLanguageState(lang);
    localStorage.setItem("nyaysathi_user", JSON.stringify(mockUser));
    localStorage.setItem("nyaysathi_lang", lang);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nyaysathi_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, language, setLanguage, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
