import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";

/* ---------------------------------- */
/* Auth Context                        */
/* ---------------------------------- */

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("auth_token")
    );

    const isAuthenticated = !!token;

    const login = (newToken: string) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
    };

    // Session Lock / Timeout Logic (5 minutes absence)
    useEffect(() => {
        if (!token) return;

        const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

        const checkTimeout = () => {
            const lastExit = localStorage.getItem("auth_last_exit");
            if (lastExit) {
                const elapsed = Date.now() - parseInt(lastExit, 10);
                if (elapsed > TIMEOUT_MS) {
                    logout();
                    localStorage.removeItem("auth_last_exit");
                    return true;
                }
            }
            return false;
        };

        const handleExit = () => {
            if (document.visibilityState === 'hidden') {
                localStorage.setItem("auth_last_exit", Date.now().toString());
            } else {
                localStorage.removeItem("auth_last_exit");
            }
        };

        // Check on mount/initial load
        const wasTimedOut = checkTimeout();

        if (!wasTimedOut) {
            window.addEventListener("visibilitychange", handleExit);
            window.addEventListener("beforeunload", () => {
                localStorage.setItem("auth_last_exit", Date.now().toString());
            });

            // Also check periodically or when returning
            const focusHandler = () => {
                checkTimeout();
            };
            window.addEventListener("focus", focusHandler);

            return () => {
                window.removeEventListener("visibilitychange", handleExit);
                window.removeEventListener("focus", focusHandler);
            };
        }
    }, [token]);

    // Sync across tabs
    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if (e.key === "auth_token") {
                setToken(e.newValue);
            }
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}

/* ---------------------------------- */
/* Protected Route                     */
/* ---------------------------------- */

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [, navigate] = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/admin/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
