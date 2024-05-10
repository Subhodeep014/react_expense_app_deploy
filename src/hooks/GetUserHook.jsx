import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const GetUserHook = () => {
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/profile');
        const data = response.data;
        // Check if data is not null and if it has the 'name' property
        if (data && data.name) {
          updateUser(data);
        }
      } catch (error) {
        console.error(error);
        <Navigate to="/"/>
      }
    };

    fetchUser();
  }, []);

  return;
};

export default GetUserHook;
