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
import { isValidElement, useCallback, useEffect, useState } from "react";
// import { sendVerificationLink } from "./action";
import { toast } from "react-toastify"
import { Triangle } from "react-loader-spinner"
import { accountVerificationHandler, resendOtpHandler, signupHandler } from "@/services/Auth.service";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [token, setToken] = useState(null);
  const [otp, setOTP] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [verificationPanel, setVerificationPanel] = useState(false);

  const navigate = useNavigate();

  const onVerify = useCallback((token: any) => {
    console.log("got token");
    setToken(token);
  }, []);

  const otpHandler = async () => {
    if (email.trim().length == 0 || otp.trim().length == 0) {
      toast.error("Some fields are empty");
      return;
    }
    setRequesting(true);
    const resp = await accountVerificationHandler({
      email,
      otp,
      recaptcha_token: token,
    });

    if (resp) {
      if (resp.success) {
        toast.success(resp.message + " , Please Login");
        window.location.href = "/login";
      } else {
        toast.error(resp.message);
      }
    } else {
      toast.error("Something went wrong");
    }

    setRequesting(false);
    setRefreshReCaptcha((r) => !r);
  };

  const resendOtp = async () => {
    if (email.trim().length == 0 && otp.trim().length === 0) {
      toast.error("Some fields are empty");

      return;
    }

    setRequesting(true);

    const resp = await resendOtpHandler({
      email,
      otp,
      recaptcha_token: token,
    });

    if (resp) {
      if (resp.success) {
        toast.success(resp.message + " , Please Login");
        window.location.href = "/login";
      } else {
        toast.error(resp.message);
      }
    } else {
      toast.error("Something went wrong");
    }

    setRequesting(false);
    setRefreshReCaptcha((r) => !r);
  };

  const signup = async () => {
    if (
      email.trim().length == 0 ||
      password.trim().length == 0 ||
      name.trim().length == 0
    ) {
      toast.error("Some fields are empty");
      return;
    }

    setRequesting(true);

    const resp = await signupHandler({
      email,
      password,
      name,
      recaptcha_token: token,
    });

    if (resp) {
      if (resp.success) {
        setVerificationPanel(true);
        toast.success(resp.message + " and verify your account");
      } else {
        toast.error(resp.message);
      }
    } else {
      toast.error("Something went wrong");
    }

    setRequesting(false);
    setRefreshReCaptcha((r) => !r);
  };

  useEffect(() => {
    setRefreshReCaptcha((r) => !r);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center items-center bg-black">
      <GoogleReCaptchaProvider reCaptchaKey="6LdUsrgpAAAAAIbJ6RrFUtalGsC2CDQrhgQI0ILX">
        <GoogleReCaptcha
          onVerify={onVerify}
          refreshReCaptcha={refreshReCaptcha}
        ></GoogleReCaptcha>
      </GoogleReCaptchaProvider>

      <Card className="mx-auto max-w-sm m-5 backdrop-blur bg-white/25">
        <CardHeader className="space-y-1 flex items-center justify-center">
          <CardTitle className="text-2xl font-bold text-white justify-self-center">
            {!verificationPanel ? "Welcome !" : "Cofirm Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                type="email"
              />
            </div>

            {verificationPanel ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="passcode" className="text-white">
                    OTP
                  </Label>
                  <div className="flex gap-1">
                    <Input
                      placeholder="OTP"
                      type="number"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    type="password"
                  />
                </div>
              </>
            )}

            <Button
              className="w-full"
              onClick={async () => {
                verificationPanel ? await otpHandler() : await signup();
              }}
              disabled={requesting && !verificationPanel}
            >
              {requesting ? (
                <div className="flex items-center justify-center gap-3">
                  Please Wait
                  <Triangle
                    visible={true}
                    height="35"
                    width="35"
                    color="white"
                    ariaLabel="triangle-loading"
                    wrapperClass=""
                  />
                </div>
              ) : (
                <div>
                  {!verificationPanel ? "Create Account" : "Confirm OTP"}
                </div>
              )}
            </Button>

            {verificationPanel && (
              <Button
                variant={"outline"}
                className="w-full"
                disabled={requesting}
                onClick={async () => {
                  await resendOtp();
                }}
              >
                {requesting && verificationPanel ? (
                  <div className="flex items-center justify-center gap-3">
                    Please Wait
                    <Triangle
                      visible={true}
                      height="35"
                      width="35"
                      color="white"
                      ariaLabel="triangle-loading"
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  "Resend OTP to Email"
                )}
              </Button>
            )}

            <div className="text-white font-sm">
              Already have account?{" "}
              <Button
                color="tertiary"
                variant={"link"}
                style={{ color: "white" }}
              >
                <div onClick={() => (window.location.href = "/login")}>
                  Login
                </div>
              </Button>
            </div>

            <div className="text-white font-sm">
              Go to Home Page{" "}
              <Button
                color="tertiary"
                variant={"link"}
                style={{ color: "white" }}
              >
                <div onClick={() => navigate("/")}>Home Page</div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}