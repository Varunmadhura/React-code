import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "D:/react-linux-app/django-react-app/src/execute.css";

export function ConnectServer(){


    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleConnectionSubmit = async (values, {resetForm}) => {
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/execute/", values);
            setOutput(response.data.output);
            setError('');
            resetForm();
        }catch(error){
            setError("Failed to execute command");
            setOutput('');
        };
    };

    const formik = useFormik({
        initialValues:{
            hostname: "",
            username: "",
            password: "",
            command: ""
        },
        validationSchema: Yup.object({
            hostname: Yup.string().required("Hostname is required"),
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
            command: Yup.string().required("Linux command is required")
        }),
        onSubmit: handleConnectionSubmit
    });

    return(
        <div className="connect-server-container ">
            <h2>Linux Server Connection and Execution</h2>
            <div className="form-output-wrapper">
                <div>
                    <form className="form-section" onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="form-label" htmlFor="hostname">Hostname</label>
                            <div><input type="text" value={formik.values.hostname} onChange={formik.handleChange} className="form-control" name="hostname" id="hostname" /></div>
                            {formik.touched.hostname && formik.errors.hostname? (
                                <div className="text-danger">{formik.errors.hostname}</div>
                            ): null}
                        </div>
                        <div>
                            <label className="form-label" htmlFor="username">Username</label>
                            <div>
                                <input type="text" value={formik.values.username}  onChange={formik.handleChange} className="form-control" name="username" id="username" />
                                {formik.touched.username && formik.errors.username ? (
                                <div className="text-danger">{formik.errors.username}</div>
                            ): null}
                            </div>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="password">Password</label>
                            <div>
                                <input type="password" value={formik.values.password}  onChange={formik.handleChange} name="password" id="password" className="form-control" />
                                {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger">{formik.errors.password}</div>
                            ): null}
                            </div>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="command">Command</label>
                            <div>
                                <input type="text" value={formik.values.command}  onChange={formik.handleChange} className="form-control" name="command" id="command" />
                                {formik.touched.command && formik.errors.command? (
                                <div className="text-danger">{formik.errors.command}</div>
                            ): null}
                            </div>
                        </div>

                        <div>
                            <button type="submit" className=" mt-2 w-100 btn btn-warning">Execute Command</button>
                        </div>
                    </form>
                </div>
                <div className="output-section">
                    {output && (
                        <div className="connect-server-output">
                            <h4>Command Output</h4>
                            <pre>{output}</pre>
                        </div>
                    )}

                        {error && (<div className="connect-server-error">
                            <h4>Error</h4>
                            <pre>{error}</pre>
                        </div>)}
                   
                </div>
                
            </div>
            

        </div>
    );
};

export default ConnectServer;