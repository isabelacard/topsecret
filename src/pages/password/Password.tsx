import React, { useState } from "react";
import { useNavigate } from "react-router"; 

import supabase from "../../services/supabase/config"; 

export default function Password() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        // Lógica oficial Supabase con redirect personalizado
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:3000/trevo/update-password"//Esto se cambiara cuando ya sea una web entonces en ese momento seria asi: https://NUESTRO_DOMINIO/trevo/update-password
        });

        if (!error) {
            setMessage("Te hemos enviado un correo de recuperación. ¡Revisa tu bandeja!");
            setEmail(""); // Limpia el campo
        } else {
            setError(error.message || "Error al enviar el correo");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen from-green-50 to-white flex items-center justify-center p-6" style={{ backgroundImage: "url(/trevo/assets/background.png)" }}>
            <div className="w-full max-w-md bg-[#121212] backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl sm:text-3xl font-[neulis] text-white mb-2">Forgot your password?</h1>
                <p className="text-sm text-white mb-6">
                    We’ll send you an email with instructions to reset your password. Please enter the email associated with your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Feedback de éxito y error */}
                    {message && <div className="bg-green-100 text-green-700 p-2 rounded-lg">{message}</div>}
                    {error && <div className="bg-red-100 text-red-700 p-2 rounded-lg">{error}</div>}

                    <label className="block">
                        <span className="text-sm font-medium text-white">Email address</span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="You@email.com"
                            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9b7ff5]"
                            aria-label="Correo electrónico"
                            disabled={loading}
                        />
                    </label>

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-2 rounded-lg bg-[#9b7ff5] text-white font-medium hover:bg-[#876ddb]"
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Send"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="cursor-pointer w-full py-2 rounded-lg bg-[#2b2b2b] text-white font-medium hover:bg-[#444]"
                        style={{ marginTop: "1px" }}
                    >
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
}
