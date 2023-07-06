import { useEffect, useState } from 'react';
import { useAppSeletor, useAppDispatch } from '../redux/app/hook'
import { index as Dashboard } from '../components/dashboard/Index'

// import { useNavigate } from 'react-router-dom';


import { fetchUser } from "../redux/features/user/userSlice"
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';

const Homepage = () => {


    const [count, setCount] = useState<number>(0);

    const tokenStr = localStorage.getItem("token");
    let data:any = undefined
    let token: any = undefined;
    if (tokenStr) {
        data = useAppSeletor(state => state.user);
        token = JSON.parse(tokenStr)
    };


    //check token && data
    // console.log("-------------")
    // console.log(data)
    // console.log("-------------")
    // console.log(token)

    let user = data?.userData || undefined


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
        user = undefined;
        data = undefined
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        navigate("/login")

        console.log(data);

    }


    if (expiryTime < now || token == null) {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    }
    // console.log(user)

    return (
        <div className='h-screen  max-sm:container'>

            {data?.loading ? (<p className='grid h-screen place-items-center'>loading...</p>) : (

                <div>
                    <header className=' container'>
                        <Navbar handleOnLogout={handleOnLogout} user={user} />
                    </header>



                    <main className=' flex overflow-hidden bg-white pt-16'>
                        {user?.role == "admin" && token ? (
                            <Dashboard />
                        ) : (
                            <div className='relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0'>
                                <div className='h-screen w-full bg-gray-50 relative flex justify-center items-center text-center'>
                                    <div className='bg-white p-16 shadow rounded'>
                                        <p>{!user && "Hello User"}</p>
                                        <p>{user?.name ? user?.name : "USER"}</p>
                                        <div className='mt-5'>
                                            <p className=' text-lg mb-5'> {count} </p>

                                            <button onClick={() => setCount(count + 1)}>
                                                Click Me !!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}

        </div>
    )
}

export default Homepage