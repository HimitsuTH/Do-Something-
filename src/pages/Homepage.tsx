import { useEffect } from 'react';
import { useAppSeletor, useAppDispatch } from '../redux/app/hook'
// import { useNavigate } from 'react-router-dom';


import { fetchUser } from "../redux/features/user/userSlice"
import Navbar from '../components/Navbar';


const Homepage = () => {
    let data = useAppSeletor(state => state.user);
    let token: any = localStorage.getItem("token")
    const user = data.userData


    // console.log(user.role)
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getUser = () => {
        if (token) {
            return dispatch(fetchUser())
        }
        return;
    }


    useEffect(() => {
        getUser();
    }, [token])


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