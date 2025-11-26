import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import supabase from "../../services/supabase/config";

// Función para leer el token del hash
function getHashParams() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return {
        accessToken: params.get("access_token"),
        refreshToken: params.get("refresh_token"),
        type: params.get("type"),
    };
}

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sessionReady, setSessionReady] = useState(false);
    const navigate = useNavigate();

    //Despues de un tiempo el link deja de funcionar entonces para que sepan cuando expiro
    useEffect(() => {
        const { accessToken, refreshToken, type } = getHashParams();
        if (type === "recovery" && accessToken && refreshToken) {
            supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
            }).then(({ error }) => {
                if (!error) {
                    setSessionReady(true);
                } else {
                    setError("Invalid or expired link");
                }
            });
        } else {
            setError("Invalid or expired link");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (password !== confirmPassword) {
            setError("The passwords do not match");
            setLoading(false);
            return;
        }
        const { error } = await supabase.auth.updateUser({ password });

        if (!error) {
            setLoading(false);
            alert("Password successfully updated");
            navigate("/login");
        } else {
            setError(error.message || "Error updating password");
            setLoading(false);
        }
    };

    // Pantalla de carga o error
    if (!sessionReady && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br" style={{ backgroundImage: "url(/assets/background.png)" }}>
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-white">Checking link...</p>
                </div>
            </div>
        );
    }
    if (error && !sessionReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br" style={{ backgroundImage: "url(/assets/background.png)" }}>
                <div className="bg-[#121212] text-red-600 rounded-xl shadow-lg p-8">
                    <h2 className="text-xl font-bold mb-4">Error:</h2>
                    <p>{error}</p>
                    <button
                        type="button"
                        className="mt-6 py-2 px-4 bg-[#9b7ff5] text-white rounded-lg"
                        onClick={() => navigate("/password")}
                    >
                        Recover password
                    </button>
                </div>
            </div>
        );
    }

    // Pantalla principal con ojito
    return (
        <div className="min-h-screen flex items-center justify-center from-green-50 to-white p-6 " style={{ backgroundImage: "url(/assets/background.png)" }}>
            <div className="w-full max-w-md bg-[#121212] backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl sm:text-3xl font-[neulis] text-white mb-2">New password</h1>
                <p className="text-sm text-white mb-6">Enter your new secure password</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-red-100 text-red-700 p-2 rounded-lg">{error}</div>}
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        className="mb-9"
                        label="New password"
                        required
                        variant="outlined"
                        value={password}
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        sx={{
                            input: { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "& fieldset": { borderColor: "#9b7ff5" },
                                "&:hover fieldset": { borderColor: "#9b7ff5" },
                                "&.Mui-focused fieldset": { borderColor: "#9b7ff5" },
                            },
                            "& .MuiInputLabel-root": { color: "gray" },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword((show) => !show)}>
                                        {showPassword ? <Visibility sx={{ color: "#9b7ff5" }} /> : <VisibilityOff sx={{ color: "purple" }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        disabled={loading}
                    />
                    <div className="mb-4">

                    </div>
                    <TextField
                        fullWidth
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        required
                        variant="outlined"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={e => setConfirmPassword(e.target.value)}
                        sx={{
                            input: { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                "& fieldset": { borderColor: "#9b7ff5" },
                                "&:hover fieldset": { borderColor: "#9b7ff5" },
                                "&.Mui-focused fieldset": { borderColor: "#9b7ff5" },
                            },
                            "& .MuiInputLabel-root": { color: "gray" },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword((show) => !show)}>
                                        {showConfirmPassword ? <Visibility sx={{ color: "#9b7ff5" }} /> : <VisibilityOff sx={{ color: "purple" }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        disabled={loading}
                    />
                    
                    <div className="mb-9">

                    </div>
                    <button
                        type="submit"
                        className="cursor-pointer w-full py-2 rounded-lg bg-[#9b7ff5] text-white font-medium hover:bg-[#876ddb]"
                        disabled={loading || !sessionReady}
                    >
                        {loading ? "Update password..." : "Update password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
