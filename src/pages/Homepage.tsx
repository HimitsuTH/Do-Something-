import { useEffect } from 'react';
import { useAppSeletor, useAppDispatch } from '../redux/app/hook'
// import { useNavigate } from 'react-router-dom';


import { fetchUser } from "../redux/features/user/userSlice"
import Navbar from '../components/Navbar';


const Homepage = () => {
    let data = useAppSeletor(state => state.user);

    const tokenStr = localStorage.getItem("token");
  
    let token: any = null;
    if (tokenStr) token = JSON.parse(tokenStr);

    // console.log(token)

    const user = data.userData


    //   console.log(token)

    // console.log(user.role)
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




    if (expiryTime < now || token == null) {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    }


    return (
        <>

            {data.loading ? (<p className='grid h-screen place-items-center'>loading...</p>) : (

                <Navbar {...user} />


            )}
            <div className=' grid h-screen place-content-center '>
                {user?.role == "admin" ? (
                    <div>
                        <p>Hello Admin</p>
                    </div>
                ) : (
                    <div>
                        <p>Hello User</p>
                    </div>
                )}
            </div>

        </>
    )
}

export default Homepage