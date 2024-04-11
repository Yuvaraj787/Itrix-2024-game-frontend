"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";
import { toast } from "react-toastify";

export function GoogleSignIn() {
  const id = "646137268332-j6g4okcld07e1hrsttvnd6f7jhushrdu.apps.googleusercontent.com" || "";
  const handleSuccess = (credentialResponse: any) => {
    console.log("Google login successful", credentialResponse);
    const credentials = credentialResponse.credential;
    console.log(credentials)
  };

  const handleError = () => {
    toast("Login attempt failed");
  };

  return (
    <div className="w-full">
      <GoogleOAuthProvider clientId={id}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          logo_alignment="center"
        />
      </GoogleOAuthProvider>
    </div>
  );
}