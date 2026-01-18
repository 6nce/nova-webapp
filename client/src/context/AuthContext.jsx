import {createContext, useContext, useEffect, useMemo, useState} from "react";
import { testUsers } from "../data/TempTestingData.jsx"

const AuthContext = createContext(null);

const STORAGE_KEY = "nova_userEmail";

export function AuthProvider({ children }) {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(()=> {
        const savedEmail = localStorage.getItem(STORAGE_KEY);

        if(!savedEmail) return;

        if (testUsers[savedEmail]) {
            setUserEmail(savedEmail)
        } else {
            localStorage.removeItem(STORAGE_KEY);
            setUserEmail(null);
        }
    }, []);

    const login = (email, password) => {
        const user = testUsers[email];
        if (!user) return {ok: false, message: "Email not found"};
        if (user.password !== password) return {ok: false, message: "Incorrect Password"};

        localStorage.setItem(STORAGE_KEY, email);
        setUserEmail(email);

        return {ok: true}
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUserEmail(null);
    }

    const isAuthed = Boolean(userEmail);

    const value = useMemo(()=> ({ userEmail, isAuthed, login, logout}), [userEmail, isAuthed]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
