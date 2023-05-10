import { useEffect } from 'react';
import { useAppSeletor, useAppDispatch } from '../redux/app/hook'
import { useNavigate } from 'react-router-dom';


import { fetchUser } from "../redux/features/user/userSlice"


const Homepage = () => {
    let data = useAppSeletor(state => state.user);
    const token = localStorage.getItem("token")
    const user = data.userData
    // console.log(data)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const getUser = () => {
    //     if (tokenStr) {
    //         dispatch(fetchUser());
    //     }
    //     return;
    // }
    const handleOnLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        navigate("/login")
    }

    useEffect(() => {
        dispatch(fetchUser())
    }, [token])


    return (
        <>
            {data.loading ? (<p className=''>loading...</p>) : (
                <>
                    <p>{user ? `${user.name} : ${user.email}` : "Hello, World"}</p>
                    {user ? <button onClick={() => handleOnLogout()}>logout</button> : <button onClick={() => navigate("/login")}>sign in</button>}
                </>
            )}

        </>
    )
}

export default Homepage