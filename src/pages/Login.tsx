import { useState } from 'react'
import { useAppDispatch, useAppSeletor } from "../redux/app/hook"
import { userLogin } from "../redux/features/auth/loginSlice"
import { Formik, Field, Form } from "formik"
import { useNavigate, NavigateFunction } from 'react-router-dom'
// import { fetchUser } from "../redux/features/user/userSlice"

interface UserLogin {
    email: string
    password: string
}


const Login = () => {

    const [loading, setLoading] = useState(false);


    const initialValues: UserLogin = { email: "", password: "" }
    const dispatch = useAppDispatch();
    let data = useAppSeletor(state => state.login);
    // console.log(data);
    const navigate: NavigateFunction = useNavigate();
    const handleOnSubmit = async (values: UserLogin) => {

        try {
            setLoading(true);
            await dispatch(userLogin({
                email: values.email || "",
                password: values.password || ""
            }))

            const token = localStorage.getItem("token")

            if (token) {
                navigate("/")
            }

            setLoading(false)


        } catch (err) {
            setLoading(false)
        }


    }




    return (
        <div>
            <nav  className='p-3 absolute top-0 w-full'>
                <ul className=' flex justify-end items-center'>
                    <li>
                        <button onClick={()=> navigate("/")}>
                            Back
                        </button>
                    </li>
                </ul>
            </nav>
            <div className=' grid h-screen place-items-center '>
                <div >
                <h1 className=' text-xl text-center font-bold select-none'>Sign in</h1>
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
                            <Field name="email" id="email" placeholder="Email" className=" input outline-none" />
                            <Field name="password" id="password" placeholder="password" type="password" className=" input outline-none" />
                            <p className=' text-red-500 my-2 text-center'>{data.error && data.error.message}</p>
                            <button type="submit" className={`${loading && "loading"} btn`} disabled={loading}>{loading ? "loading..." : "sign up"}</button>
                        </Form>
                    </Formik>
                    <div className=' flex gap-x-2 mt-4'>
                        <p>Don't have an account?</p>
                        <a href='/register'>Signup now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login