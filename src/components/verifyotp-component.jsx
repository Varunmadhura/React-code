import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  let navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  axios.defaults.withCredentials = true;
  const handleOTPSubmit = (values) => {
    console.log("Entered OTP:", values.otp);
  
    axios
      .post("http://127.0.0.1:8000/api/verifyotp/", {
        otp: values.otp 
      }, { withCredentials: true })
      .then((response) => {
        alert("OTP Verified Successfully");
        navigate("/connect");
      })
      .catch((error) => {
        console.error("Error in OTP verification:", error.response ? error.response.data : error.message);
        setMessage("Failed to Verify OTP, Please try again");
      });
  };
  
  
  

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().matches(/^\d{6}$/, "OTP must be 6 digits").required("OTP is required"),
    }),
    onSubmit: handleOTPSubmit,
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            name="otp"
            className="form-control"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.otp && formik.errors.otp && <div className="text-danger">{formik.errors.otp}</div>}
        </div>
        <div>
          <button className="btn btn-primary" type="submit" disabled={timeLeft === 0}>
            Verify OTP
          </button>
        </div>
      </form>
      <div>
        {timeLeft > 0 ? (
          <span>Time left: {formatTime(timeLeft)}</span>
        ) : (
          <p className="text-danger">Your OTP has expired. Please request a new one.</p>
        )}
      </div>
      <div>{message && <p>{message}</p>}</div>
    </div>
  );
}

export default VerifyOTP;