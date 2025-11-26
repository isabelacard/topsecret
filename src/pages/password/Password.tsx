import React, { useState } from "react";

export default function Password () {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.info("sent to", email);
    };

    return (
        <div className="min-h-screen from-green-50 to-white flex items-center justify-center p-6" style={{ backgroundImage: "url(/trevo/assets/background.png)" }}>
            <div className="w-full max-w-md bg-[#121212] backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl sm:text-3xl font-[neulis] text-white mb-2">Forgot your password?</h1>
                <p className="text-sm text-white mb-6">We’ll send you an email with instructions to reset your password. Please enter the email associated with your account.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-white">Email adress</span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9b7ff5]"
                            aria-label="Correo electrónico"
                        />
                    </label>

                    <button type="submit" className="cursor-pointer w-full py-2 rounded-lg bg-[#9b7ff5] text-white font-medium hover:bg-[#876ddb] transition">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
