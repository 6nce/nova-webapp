import {createContext, useContext, useEffect, useMemo, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        const savedUser = localStorage.getItem("nova_user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const login = async (email, secret) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, secret})
        });

        const data = await res.json();
        if(!res.ok) return {ok:false, message:data.error}

        localStorage.setItem("nova_token", data.token);
        localStorage.setItem("nova_user", JSON.stringify(data.user));
        setUser(data.user);
        return { ok: true }
    };

    const logout = () => {
        localStorage.removeItem("nova_token");
        localStorage.removeItem("nova_user");
        setUser(null);
    }

    const value = useMemo(()=> ({ user, login, logout}), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
