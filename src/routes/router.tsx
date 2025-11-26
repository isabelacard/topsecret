import { createBrowserRouter } from "react-router";

import Splash from "../pages/splash/splash";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Onboarding1 from "../pages/onboarding1/Onboarding1";
import Onboarding2 from "../pages/onboarding2/Onboarding2";
import EntryPoint from "../pages/entrypoint/EntryPoint";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Instructors from "../pages/discover/instructors/Instructors";
import Workouts from "../pages/discover/workouts/Workouts";
import Myworkouts from "../pages/myworkouts/myworkouts";
import AuthLayout from "../layout/AuthLayout";
import password from "../pages/password/Password";
import UpdatePassword from "../pages/password/UpdatePassword";

const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: Splash,
        },
        {
            path: "onboarding1",
            Component: Onboarding1,
        },
        {
            path: "onboarding2",
            Component: Onboarding2,
        },
        {
            path: "entrypoint",
            Component: EntryPoint,
        },
        {
            path: "login",
            Component: Login,
        },
        {
            path: "signup",
            Component: Signup,
        },
        {
            path: "password",
            Component: password,
        },
        {
            path: "update-password",
            Component: UpdatePassword,
        },
        {
            path: "auth",
            Component: AuthLayout,
            children: [
                {
                    path: "home",
                    Component: Home,
                },
                {
                    path: "profile",
                    Component: Profile,
                },
                {
                    path: "myworkouts",
                    Component: Myworkouts,
                },
                {
                    path: "discover",
                    children: [
                        {
                            path: "instructors",
                            Component: Instructors,
                        },
                        {
                            path: "workouts",
                            Component: Workouts,
                        },
                    ],
                },
            ],
        },
    ],
    { basename: "/" }
);

export default router;