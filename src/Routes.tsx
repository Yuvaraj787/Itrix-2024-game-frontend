import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { } from "react-router"
const Login = lazy(() => import("./pages/LandingPage/login"));
const SignUp = lazy(() => import("./pages/LandingPage/signup"));
const _404 = lazy(() => import("./pages/404"));
const HomePage = lazy(() => import("./pages/HomePage/index"))
const Instruction = lazy(() => import("./pages/LandingPage/instructions"))
const AfterStart = lazy(() => import('./pages/AuctionPage/afterStart'));
const BeforeStart = lazy(() => import('./pages/AuctionPage/beforeStart'));
const Index = lazy(() => import('./pages/LandingPage'));
// const Guest = lazy(() => import( './pages/LandingPage/guest'));
const Profile = lazy(() => import('./pages/Profile/profile'));
const GameResult = lazy(() => import('./pages/LeaderBoard/gameResult'));
const UsersLeaderBoard = lazy(() => import('./pages/LeaderBoard/usersLeaderBoard'));
const TeamLeaderBoard = lazy(() => import('./pages/LeaderBoard/teamLeaderBoard'));


const authRoute = [
  {
    path: "/profile/:userid",
    element: <Profile />
  },
  {
    path: "/gameResult",
    element: <GameResult />
  },
  {
    path: "/usersLeaderBoard",
    element: <UsersLeaderBoard />
  },
  {
    "path": "/guide",
    "element": <Instruction />
  },
  {
    path: "/teamLeadersBoard",
    element: <TeamLeaderBoard />
  },
  {
    path: "/",
    element: <Index isAuth={true} />
  },
  {
    path: "/join_room",
    element: <HomePage />
  },
  {
    path: "/join_room/:room_id",
    element: <BeforeStart />
  },
  {
    path: "/join_room/:room_id/start",
    element: <AfterStart />
  }
]

const unAuthRoute = [
  {
    "path": "/login",
    "element": <Login />
  },
  {
    "path": "/guide",
    "element": <Instruction />
  },
  {
    "path": "/signup",
    "element": <SignUp />
  },{
    "path": "/usersLeaderBoard",
    "element": <UsersLeaderBoard />
  },{
    path: "/",
    element: <Index isAuth={false}/>
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
    <div
      style={{
        fontWeight: 400,
        color: "black",
        fontStyle: "normal",
      }}
    >
      <BrowserRouter>
        <Suspense>
          <Routes>
            {data.map((item: any) => {
              return <Route path={item.path} element={item.element}></Route>;
            })}
            <Route
              path="*"
              element={<Navigate to={default_}></Navigate>}
            ></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default CustomRouter;