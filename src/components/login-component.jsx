import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "D:/react-linux-app/django-react-app/src/form.css";



export function Login(){

    let navigate = useNavigate();

    const [error, setError] = useState("");

    const handleLoginSubmit = async(values, {resetForm}) => {
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/login/",{email:values.email,password:values.password},
                {withCredentials: true}
            );
            console.log("Response:", response);
            if (response.status === 200){

                const otp = response.data.otp;

                

                sessionStorage.setItem("otp", otp);

                console.log("stored otp:", otp)

                alert("Login Successfull.");
                sessionStorage.setItem("email", values.email)
                navigate('/verifyotp');
            }
        }catch(error){
            alert("Login failed please check your credentials");
            setError("Invalid Login Credentials Please try again");
            resetForm();
        }
    };
    
    const formik = useFormik({
        initialValues: {
            email:"",
            password:""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email Format").required("Email required"),
            password: Yup.string().required("Password required")
        }),
        onSubmit: handleLoginSubmit     
    })


    return(
        <div className="form-container">
          
            <form onSubmit={formik.handleSubmit}>
                <h2 className="bi bi-person-fill">Login</h2>
                <div>
                    <label className="form-label" htmlFor="email">Email</label>
                    <div>
                        <input className="form-control" onBlur={formik.handleBlur} type="email" onChange={formik.handleChange} name="email" id="email" />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Password</label>
                    <div>
                        <input className="form-control" onBlur={formik.handleBlur} type="password" onChange={formik.handleChange} name="password" id="password" />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>
                </div>
                <button type="submit" className=" w-100 mt-2 btn btn-primary">Login</button>
            </form>
            <p>Not Registered, <Link to="/register">Register Here</Link></p>
        </div>
        
    );
};

export default Login;