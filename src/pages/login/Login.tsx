import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { TextField, InputAdornment, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChevronLeft } from "lucide-react";

import authService from "../../services/supabase/authService";
import { BtnLogin } from "../../components/BtnLogin";

export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const nav = useNavigate();
    const matches = useMediaQuery("(min-width:768px)");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const prev = document.documentElement.style.overflowX;
        document.documentElement.style.overflowX = matches ? "hidden" : "";
        return () => {
            document.documentElement.style.overflowX = prev?? "";
        };
    }, [matches]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formResponse = formRef.current;
        if (!formResponse) return;

        const formData = new FormData(formResponse);
        const email = (formData.get("email") as string) || ""; 
        const password = (formData.get("password") as string) || "";

        setLoading(true);

        try {
            const result = await authService.signIn(email, password);

            if (result.success) {
                console.info("Login exitoso:", result);
                nav("/auth/home");
            } else {
                console.error("Error en login:", result.error);
                alert("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            alert("Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex h-screen overflow-hidden ${matches ? "flex-row" : "flex-col bg-[#111]"}`}>
            {matches && (
                <div
               className="w-1/2 bg-no-repeat bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url(./assets/backgroundlogin.png)",
                    }}
                >
                    <div className="absolute left-[100px] top-[200px]">
                        <img src="./assets/logintitle.png" alt="login title" className="w-[260px] md:w-[320px] lg:w-[480px] object-contain" />
                    </div>
                    <div className="absolute bottom-0 left-[110px] w-[65%]">
                        <img src="./assets/loginilustration.png" alt="login ilustration" className="w-[600px]" />
                    </div>
                </div>
            )}

            {!matches && (
                <div
                    className="font-[Neulis] relative w-full h-[220px] flex flex-col justify-center items-center rounded-b-[40px]"
                    style={{
                        backgroundImage: "url(./assets/backgroundlogin.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Link to="/entrypoint" className="absolute top-6 left-6 p-2 mt-15 bg-opacity-20 backdrop-blur-sm z-10 hover:bg-opacity-30 transition">
                        <ChevronLeft size={40} color="#CAD83B" strokeWidth={2.2} className="hover:scale-105 transition-transform" />
                    </Link>

                    <h1 className="text-[50px] font-bold text-[#CAD83B] mt-07">Trevo</h1>
                </div>
            )}
            <div
                className={`flex flex-col justify-center items-center text-white bg-[#111]
                ${matches ? "w-1/2 p-24" : "w-full px-8 py-10 rounded-t-[40px] -mt-12 z-10"}`}
            >
                <h1 className={`${matches ? "text-5xl" : "text-3xl"} font-medium mt-8 mb-4 font-[Neulis] text-center`}>Welcome Back</h1>
                <p className="text-white mb-1 text-sm font-[poppins] text-center">Ready to continue your fitness journey?</p>
                <p className="text-white text-sm font-[poppins] text-center mb-8">Your path is right here</p>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 w-[90%] md:w-[400px] max-w-md font-[poppins]">
                    
                    <TextField
                        fullWidth
                        label="Username or Email" 
                        variant="outlined"
                        name="email"
                        required
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
                    />

                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        name="password"
                        required
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
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <Visibility sx={{ color: "#9b7ff5" }} /> : <VisibilityOff sx={{ color: "white" }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div className="flex justify-between items-center w-full mb-30 mt-1">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="remember-me"
                                    sx={{
                                        color: "#CAD83B",
                                        "&.Mui-checked": { color: "#CAD83B" },
                                        "& .MuiSvgIcon-root": { borderRadius: "50%" },
                                    }}
                                />
                            }
                            label="Remember me"
                            sx={{
                                "& .MuiFormControlLabel-label": {
                                    color: "white",
                                    fontSize: "0.875rem",
                                    fontFamily: "poppins",
                                },
                            }}
                        />
                        <Link to="/password" className="text-sm text-[#9b7ff5] underline font-[poppins]">
                            Forgot password?
                        </Link>
                    </div>

                    {loading ? <p className="text-white">Iniciando sesión</p> : <BtnLogin />}

                    <p className="text-white pt-2 text-[12px] font-[poppins] text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#9872F0] underline font-[poppins]">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}