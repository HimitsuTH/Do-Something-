import { useEffect } from 'react';
import { useAppSeletor, useAppDispatch } from '../redux/app/hook'
// import { useNavigate } from 'react-router-dom';


import { fetchUser } from "../redux/features/user/userSlice"
import Navbar from '../components/navbar';


const Homepage = () => {
    let data = useAppSeletor(state => state.user);
    const token = localStorage.getItem("token")
    const user = data.userData
    // const navigate = useNavigate();


    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fetchUser())
    }, [token])


    return (
        <>

            {data.loading ? (<p className='grid h-screen place-items-center'>loading...</p>) : (

                <Navbar {...user} />

            )}

        </>
    )
}

export default Homepage