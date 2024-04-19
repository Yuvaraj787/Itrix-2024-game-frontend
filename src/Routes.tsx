import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { } from "react-router"
const Login = lazy(() => import("./pages/LandingPage/login"));
const SignUp = lazy(() => import("./pages/LandingPage/signup"));
const _404 = lazy(() => import("./pages/404"));
const HomePage = lazy(() => import("./pages/HomePage/index"))


const authRoute = [
    {
        "path": "/",
        "element": <HomePage />
    }
]

const unAuthRoute = [
    {
        "path": "/login",
        "element": <Login />
    },
    {
        "path": "/signup",
        "element": <SignUp />
    }
]

function CustomRouter({ isAuth }): { isAuth: any } {

    if (isAuth) {
        return (
            <Routes__ default_="/" data={authRoute}>
            </Routes__>
        )
    }

    return (
        <Routes__ default_="/login" data={unAuthRoute}>
        </Routes__>
    );
}

// for allowing only id present in data


function Routes__({ data, default_ }: { data: any, default_: string }) {
    console.log(data)
    return (
        <BrowserRouter>
            <Suspense >
                <Routes>
                    {
                        data.map((item: any) => {
                            return (
                                <Route path={item.path} element={item.element}></Route>
                            )
                        })
                    }
                    <Route path="*" element={<Navigate to={default_}></Navigate>} ></Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default CustomRouter;