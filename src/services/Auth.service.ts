import axios from "axios";
import port  from '@/OwnComponents/variables';
//jwt-token
export const jwtTokenHandler = async () => {
  try {
    const token = localStorage.getItem("jwtToken");

    console.log(token);

    const resp = await axios.get(port + "/auth/verifyToken/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (resp.data.message) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// login

export const loginHandler = async (data: any) => {
  try {
    const resp = await axios.post(port + "/auth/login/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

// signup
export const signupHandler = async (data: any) => {
  try {
    const resp = await axios.post(port + "/auth/signup/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

// confirmation after signup
export const accountVerificationHandler = async (data: any) => {
  try {
    const resp = await axios.post(port + "/auth/verifyOtp/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

// resend otp
export const resendOtpHandler = async (data: any) => {
  try {
    const resp = await axios.post(port + "/auth/resendOtp/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

//reset password
export const requestResetPasswordHandler = async (data: any) => {
  try {
    const resp = await axios.post(port + "/auth/resetPasswordOtp/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

// confirmation after forgot password

export const resetPasswordHandler = async (data: any) => {
  try {
    const resp = await axios.post(port + "/auth/verifyResetPassword/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};
