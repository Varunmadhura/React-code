import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "D:/react-linux-app/django-react-app/src/form.css";

function VerifyOTP() {
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const storedOTP = sessionStorage.getItem("otp");

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

  const handleOTPSubmit = (values) => {
    const enteredOTP = values.otp.trim();
    const cleanStoreOTP = storedOTP ? storedOTP.trim() : "";

    console.log("Entered OTP:", enteredOTP);
    console.log("Stored OTP:", cleanStoreOTP);

    if(enteredOTP === cleanStoreOTP){
      alert("OTP verified Successfully");
      navigate("/connect");
    }else{
      setMessage("Failed to verify OTP, Please try again");
    }
  };


  const handleResentOTP = async () => {
    const storedEmail = sessionStorage.getItem("email")
    if(storedEmail){
      try{
        const response = await axios.post("http://127.0.0.1:8000/api/resendotp/", {
          email: storedEmail,
        });
        if(response.data.success){
          setTimeLeft(60);
          setMessage("New OTP sent Successfully!");
          sessionStorage.setItem("otp", response.data.new_otp);
        }else{
          setMessage("Failed to resend OTP, Please try again")
        }
      }catch(error){
        setMessage("Error Sending New OTP, Please try again")
      };
    };
    }
    

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
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="otp">Verify OTP:</label>
          <input
            type="text"
            name="otp"
            className="form-control"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.otp && formik.errors.otp && <div className="error-message">{formik.errors.otp}</div>}
        </div>
        <div>
          <button className="btn btn-primary" type="submit" disabled={timeLeft === 0}>
            Verify
          </button>
        </div>
      </form>
      <div>
        {timeLeft > 0 ? (
          <span className="align-center">Time left: {formatTime(timeLeft)}</span>
        ) : (
          <p className="text-danger">Your OTP has expired. Please request a new one.</p>
        )}
      </div>

        <div>
          <button className="btn btn-warning"
                  onClick={handleResentOTP}
                  disabled={timeLeft > 0}>Resend OTP</button>
        </div>

      <div>{message && <p>{message}</p>}</div>
    </div>
  );
}

export default VerifyOTP;