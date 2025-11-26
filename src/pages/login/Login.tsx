import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { TextField, InputAdornment, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChevronLeft } from "lucide-react";

import { BtnLogin } from "../../components/BtnLogin";
import { getUsers } from "../../services/userServices";
import type { userType } from "../../types/userTypes";

export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const nav = useNavigate();
    const matches = useMediaQuery("(min-width:768px)");

    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState<userType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchData();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formResponse = formRef.current;
        if (!formResponse) return;

        const formData = new FormData(formResponse);
        const usernameOrEmail = formData.get("username") as string;
        const password = formData.get("password") as string;

        const user = users.find((u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            nav("/auth/home");
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className={`flex h-screen overflow-hidden ${matches ? "flex-row" : "flex-col bg-[#111]"}`}>
            {matches && (
                <div
                    className="w-1/2 bg-no-repeat bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url(/trevo/assets/backgroundlogin.png)",
                    }}
                >
                    <div className="absolute left-[100px] top-[200px]">
                        <img src="/trevo/assets/logintitle.png" alt="login title" className="w-[260px] md:w-[320px] lg:w-[480px] object-contain" />
                    </div>
                    <div className="absolute bottom-0 left-[110px] w-[65%]">
                        <img src="/trevo/assets/loginilustration.png" alt="login ilustration" className="w-[600px]" />
                    </div>
                </div>
            )}

            {!matches && (
                <div
                    className="font-[Neulis] relative w-full h-[220px] flex flex-col justify-center items-center rounded-b-[40px]"
                    style={{
                        backgroundImage: "url(/trevo/assets/backgroundlogin.png)",
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
                        label="Enter email or username"
                        variant="outlined"
                        name="username"
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
                                        {showPassword ? <Visibility sx={{ color: "purple" }} /> : <VisibilityOff sx={{ color: "white" }} />}
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

                    <BtnLogin />

                    <p className="text-white pt-2 text-[12px] font-[poppins] text-center">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-[#9872F0] underline font-[poppins]">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
