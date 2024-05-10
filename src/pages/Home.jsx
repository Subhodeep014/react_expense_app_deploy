import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Home  = ()=>{
    const {user, updateUser} = useContext(UserContext);
    const [isLoading, setIsLoding]= useState(true);

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const {data} = await axios.get('/profile');
                updateUser(data);
            } catch (error) {
                console.error('Error fetching user data', error);
                // setIsLoding(false)
            }
        }
        fetchUser();
    },[])

    return (
        <div>
            {user &&( 
                <>
                    <h1>Hello! {user.name}</h1>
                    <h1>Welcome to our Page</h1>
                </>



            )}
            {!user && <>No user</>}
            
            
        </div>

    )
}
export default Home;