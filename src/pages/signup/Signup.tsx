import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { TextField, InputAdornment, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChevronLeft } from "lucide-react";

import authService from "../../services/supabase/authService";
import { BtnSignUp } from "../../components/BtnSignUp";

export default function Signup() {
    const formRef = useRef<HTMLFormElement>(null);
    const nav = useNavigate();
    const matches = useMediaQuery("(min-width:768px)");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Estado para evitar doble click

    useEffect(() => {
        const prev = document.documentElement.style.overflowX;
        document.documentElement.style.overflowX = matches ? "hidden" : "";
        return () => {
            document.documentElement.style.overflowX = prev ?? "";
        };
    }, [matches]);

    const handleClickShowPassword = () => setShowPassword((s) => !s);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formResponse = formRef.current;
        if (!formResponse) return;

        const formData = new FormData(formResponse);
        const username = (formData.get("username") as string) || "";
        const email = (formData.get("email") as string) || "";
        const password = (formData.get("password") as string) || "";

        setLoading(true); // Activamos carga

        try {
            console.info("Intentando registrar usuario:", { username, email });
            
            const result = await authService.signUp(email, password, {
                username: username,
            });

            if (result.success) {
                console.info("Usuario registrado con éxito:", result);
                nav("/login"); 
            } else {
                console.error("Fallo en registro:", result);
                alert("Error al registrar: " + ("Intenta de nuevo"));
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            alert("Ocurrió un error inesperado.");
        } finally {
            setLoading(false); 
        }
    };

    const textFieldStyle = {
        input: { color: "white" },
        "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            "& fieldset": { borderColor: "#9b7ff5" },
            "&:hover fieldset": { borderColor: "#9b7ff5" },
            "&.Mui-focused fieldset": { borderColor: "#9b7ff5" },
        },
        "& .MuiInputLabel-root": { color: "gray" },
    };

    return (
        <div className={`flex h-screen ${matches ? "flex-row overflow-x-hidden box-border" : "flex-col bg-[#111]"}`}>
            <div
                className={`relative bg-no-repeat bg-cover bg-center ${matches ? "w-1/2 h-full overflow-hidden" : "w-full h-[220px] rounded-b-[40px] z-0"}`}
                style={{
                    backgroundImage: "url(/assets/backgroundlogin.png)",
                }}
            >
                <div className={`font-[Neulis] ${matches ? "absolute left-[100px] top-[200px]" : "flex flex-col justify-center items-center h-full relative"}`}>
                    {!matches && (
                        <Link to="/entrypoint" className="absolute left-6 p-2 bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition">
                            <ChevronLeft size={40} color="#CAD83B" strokeWidth={2.2} className="hover:scale-105 transition-transform" />
                        </Link>
                    )}
                    {matches ? <img src="/assets/logintitle.png" alt="Trevo Title" className="object-contain" style={{ width: "100%", maxWidth: 480, height: "auto" }} /> : <h1 className="text-[50px] font-bold text-[#CAD83B]">Trevo</h1>}
                </div>

                {matches && (
                    <div className="absolute bottom-0 left-[110px] overflow-hidden" style={{ maxWidth: "60%" }}>
                        <img src="/assets/loginilustration.png" alt="Signup ilustration" className="object-contain" style={{ width: "100%", maxWidth: 600, height: "auto", display: "block" }} />
                    </div>
                )}
            </div>
            <div className={`flex flex-col justify-center items-center text-white bg-[#111] ${matches ? "w-1/2 px-16 py-12 h-full overflow-y-auto box-border" : "w-full px-8 py-10 rounded-t-[40px] -mt-12 z-10 flex-grow overflow-y-auto"}`}>
                <h1 className={`${matches ? "text-5xl" : "text-3xl"} font-medium mt- mb-4 font-[Neulis] text-center w-full max-w-md`}>Create account</h1>
                <p className="text-white mb-1 text-sm font-[poppins] text-center w-full max-w-md">We’re here to help you reach the peaks</p>
                <p className="text-white text-sm font-[poppins] text-center mb-8 w-full max-w-md">of fitness. Are you ready?</p>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 w-[90%] md:w-[400px] max-w-md font-[poppins]">
                    <TextField fullWidth label="Enter username" variant="outlined" name="username" required sx={textFieldStyle} />
                    <TextField fullWidth label="Enter email" variant="outlined" name="email" type="email" required sx={textFieldStyle} />
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        name="password"
                        required
                        sx={textFieldStyle}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <Visibility sx={{ color: "#9872F0" }} /> : <VisibilityOff sx={{ color: "white" }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div className="flex justify-start w-full mb-12 mt-1">
                        <FormControlLabel
                            control={<Checkbox id="remember-me" name="remember-me" sx={{ color: "#CAD83B", "&.Mui-checked": { color: "#CAD83B" }, "& .MuiSvgIcon-root": { borderRadius: "50%" } }} />}
                            label="Remember me"
                            sx={{ "& .MuiFormControlLabel-label": { color: "white", fontSize: "0.875rem", fontFamily: "poppins" } }}
                        />
                    </div>

                    {loading ? <p className="text-[#CAD83B]">Loading...</p> : <BtnSignUp />}

                    <p className="text-white pt-2 text-[12px] font-[poppins] text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#9872F0] underline font-[poppins]">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}