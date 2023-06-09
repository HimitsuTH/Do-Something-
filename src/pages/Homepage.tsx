import { useEffect } from 'react';
import { useAppSeletor, useAppDispatch } from '../redux/app/hook'
// import { useNavigate } from 'react-router-dom';


import { fetchUser } from "../redux/features/user/userSlice"
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const tokenStr = localStorage.getItem("token");
    let data = null
    let token: any = null;
    if (tokenStr) {
        data = useAppSeletor(state => state.user);
        token = JSON.parse(tokenStr)
    };

    console.log("-------------")
    console.log(data)
    console.log("-------------")
    // console.log(token)

    let user = data?.userData


    //   console.log(token)


    // console.log("----------------------")
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const getUser = () => {
        if (tokenStr) {
            return dispatch(fetchUser())
        }

        return;

    }


    useEffect(() => {
        getUser();
    }, [tokenStr])


    const now = new Date().getTime();


    const expires_in: number = parseInt(String(token?.expires_in));
    const expiryTime = expires_in * 1000;



    const navigate = useNavigate();
    const handleOnLogout = () => {

        // console.log(user)
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        navigate("/login")
    }


    if (expiryTime < now || token == null) {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    }
    // console.log(user)

    return (
        <>

            {data?.loading ? (<p className='grid h-screen place-items-center'>loading...</p>) : (

                <Navbar handleOnLogout={handleOnLogout} user={user} />


            )}
            <div className=' grid h-screen place-content-center '>
                {user?.role == "admin" ? (
                    <div className=' text-center '>
                        <p>Hello Admin</p>
                        <p>{user?.name && "ADMIN"}</p>
                    </div>
                ) : (
                    <div className=' text-center '>
                        <p>Hello User</p>
                        <p>{user?.name ? user?.name : "USER"}</p>
                    </div>
                )}
            </div>

        </>
    )
}

export default Homepage