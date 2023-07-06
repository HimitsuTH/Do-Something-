import React, { useState } from 'react'

import { useAppDispatch, useAppSeletor } from '../redux/app/hook'

import { userRegister } from '../redux/features/auth/registerSlice'

import { useNavigate, NavigateFunction } from 'react-router-dom'

import { Formik, Field, Form } from "formik"

interface userRegister {
    email: string,
    password: string,
    conPassword: string
    username: string
}

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const dispatch = useAppDispatch();

    // console.log(data);

    const initialValues: userRegister = { email: "", password: "", conPassword: "", username: "" }
    const navigate: NavigateFunction = useNavigate();


    const handleOnSubmit = async (values: userRegister) => {
        try {
            setLoading(true);
            console.log(values);

            if (values.password !== values.conPassword && values.conPassword && values.password) {
                return;
            } else {
                await dispatch(userRegister({
                    name: values?.username,
                    email: values?.email,
                    password: values?.password
                })).then((res) => {
                    const payload = res.payload

                    if (payload.status_code == 400 || payload.status_code == 404 || payload.status_code == 422) {
                        setErrorMsg("Something went wrong!!");
                    } else {
                        navigate("/login");
                        setErrorMsg("");
                    }
                });



            }



        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <header className=' fixed z-20 w-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col'>
                <nav className='p-3'>
                    <ul className=' flex justify-end items-center'>
                        <li>
                            <button onClick={() => navigate("/")}>
                                Back
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className=' grid h-screen place-items-center '>
                <div >
                    <h1 className=' text-xl text-center font-bold select-none'>Sign up</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            handleOnSubmit(values)
                            // resetForm({values: {
                            //     email: "",
                            //     password:""
                            // }})
                            // navigate("/")

                        }}
                    >
                        <Form className=' flex flex-col gap-2'>
                            <Field name="username" id="username" placeholder="Username" className=" input outline-none" />
                            <Field name="email" id="email" placeholder="Email" className=" input outline-none" />
                            <Field name="password" id="password" placeholder="password" type="password" className=" input outline-none" />
                            <Field name="conPassword" id="conPassword" placeholder="confirm password" type="password" className=" input outline-none" />
                            <p className=' text-red-500 my-2 text-center'>{errorMsg && errorMsg}</p>
                            <button type="submit" className={`${loading && "loading"} btn`} disabled={loading}>{loading ? "loading..." : "sign up"}</button>
                        </Form>
                    </Formik>
                    <div className=' flex gap-x-2 mt-4'>
                        <p>already have an account?</p>
                        <a href='/login'>Signin now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register