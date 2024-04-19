"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
// import { sendVerificationLink } from "./action";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify"
import { Triangle } from "react-loader-spinner"
import { loginHandler } from "@/services/Auth.service";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { useContext } from "react";
import { CustomContext } from "@/App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [token, setToken] = useState(null)
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const data = useContext(CustomContext)

  const onVerify = useCallback((token: any) => {

    setToken(token)
  }, [])

  const login = async () => {

    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('Some fields are empty')
      return
    }

    setRequesting(true)

    const resp = await loginHandler({
      email,
      password,
      "recaptcha_token": token
    })

    if (resp) {

      if (resp.success) {
        localStorage.setItem("jwtToken", resp.data.jwtToken)
        toast.success(resp.message)
        data?.changeAuth(true)
      }
      else {
        toast.error(resp.message)
      }
    }
    else {
      toast.error("Something went wrong")
    }

    setRequesting(false)
    setRefreshReCaptcha(r => !r)

  }

  useEffect(() => {

    setRefreshReCaptcha(r => !r)
  }, [])


  return (
    <div className="min-h-screen flex justify-center items-center items-center bg-black">

      <GoogleReCaptchaProvider reCaptchaKey="6LdUsrgpAAAAAIbJ6RrFUtalGsC2CDQrhgQI0ILX">
        <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha}>

        </GoogleReCaptcha>

      </GoogleReCaptchaProvider>

      <Card className="mx-auto max-w-sm m-5 backdrop-blur bg-white/25">
        <CardHeader className="space-y-1 flex items-center justify-center">
          <CardTitle className="text-2xl font-bold text-white justify-self-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                type="password"
              />
            </div>

            <Button
              className="w-full"
              onClick={async () => { await login() }}
              disabled={requesting}
            >
              {
                requesting ? <div className="flex items-center justify-center gap-3">
                  Please Wait
                  <Triangle
                    visible={true}
                    height="35"
                    width="35"
                    color="white"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div> : "Login"
              }


            </Button>

            <div className="text-white font-sm">
              Don't have account? <Button color="tertiary" variant={"link"} style={{ color: "white" }} >
                <div onClick={() => window.location.href = "/signup"}>Signup</div>
              </Button>
            </div>

            <div className="text-white">
              Forgot Password? <Button style={{ color: "white" }} variant={"link"}>Click Here</Button>
            </div>


          </div>
        </CardContent>
      </Card>
    </div>
  );
}