

import { useNavigate } from 'react-router-dom';

const Navbar = ({ handleOnLogout, ...userProps }: any) => {
    // console.log(userProps);
  

    const user = userProps?.user;



    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    // const handleOnLogout = () => {
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("userData")

    //     navigate("/login")
    // }

    return (
        <div className='bg-white border-b border-gray-200 fixed z-30 w-full'>
            <div className=' flex justify-end items-center p-3'>
                <p className=' mr-2 select-none'>{token ? `${user?.name} : ${user?.email}` : "Hello, World"}</p>
                {token ? <button onClick={() => handleOnLogout()}>logout</button> : <button onClick={() => navigate("/login")}>sign in</button>}
            </div>
        </div>
    )
}

export default Navbar