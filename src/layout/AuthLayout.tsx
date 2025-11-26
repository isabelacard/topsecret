import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import supabase from "../services/supabase/config";

export default function AuthLayout() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Obtener sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        //Suscribirse a cambios
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Pantalla de carga :()
    if (loading) {
        return (
            <div className="min-h-screen bg-[#111] flex items-center justify-center text-[#CAD83B] font-[Neulis]">
                Loading Trevo...
            </div>
        );
    }

    // Si no hay sesión, redirigir al login
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // Si hay sesión, mostrar la app
    return <Outlet />;
}