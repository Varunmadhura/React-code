import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Register(){


  let navigate = useNavigate();

  const handleRegisterSubmit = async (values) => {
    try{
      await axios.post("http://127.0.0.1:8000/api/register/" , values);
      alert("Registration Successfull");
      navigate("/login")
    }catch(error){
      alert("Registration failed please check the data");
      console.error("Registration error:", error.response?.data || error.message);
    }
  }

  const formik = useFormik({
    initialValues:{
      username: "",
      email: "",
      mobile: "",
      password: "",
      cfrm_password: ""
    },
    validationSchema: Yup.object({
      username : Yup.string().required("Username required"),
      email: Yup.string().email("Invalid email format").required("Email required"),
      mobile: Yup.string().max(10,"Invalid Mobile Number").matches(/^\d+$/,"Mobile number must be in digits").required("Mobile required"),
      password: Yup.string().min(8,"Password musat be atleast 8 characters").matches(/[A-Z]/, "Passwod must contain atleast one uppercase")
      .matches(/[a-z]/,"Password must contain atleast one lower case").matches(/\d/,"Passwords must contain atleast one digit")
      .matches(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain atleast one special character").required("Password is required"),
      cfrm_password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    }),
    onSubmit: handleRegisterSubmit

  });


  return(
    <div className="container-fluid">
      <form className="w-25 p-2" onSubmit={formik.handleSubmit}>
          <h2 className="bi bi-person-circle">Registration</h2>
          <div>
            <label htmlFor="username">Username</label>
            <div>
              <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" value={formik.values.username} name="username" id="username" />
              {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
               ) : null}
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" />
              {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label htmlFor="mobile">Mobile</label>
            <div>
              <input className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.mobile} type="text" name="mobile" id="mobile" />
              {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-danger">{formik.errors.mobile}</div>
                ) : null}
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
              {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
                ) : null}
            </div>
          </div>
          <div>
            <label htmlFor="cfrmpwd">Confirm Password</label>
            <div>
              <input className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.cfrm_password} type="password" name="cfrm_password" id="cfrm_password" />
              {formik.touched.cfrm_password && formik.errors.cfrm_password ? (
              <div className="text-danger">{formik.errors.cfrm_password}</div>
              ) : null}
            </div>
          </div>
          <div>
            <button type="submit" className=" w-100 mt-2 btn btn-primary">Register</button>
          </div>
      </form>
      <p>Already Registered,Please <Link to="/login">Login</Link> </p>
    </div>
  )
}

export default Register;