import { createContext, useState, useEffect } from "react";
import { AddSkill } from "../services/productapi";
export const DataContext = createContext();


export const DataProvider = ({children}) => {
    const [searchskill, setSearchskill] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    const [activeView, setActiveView] = useState('skill'); // 'users' or 'access_code'
    const [responseData, setResponseData] = useState(null);
    const handleSearchChange = (e) => {
        setSearchskill(e.target.value.toLowerCase());
    }

    useEffect(() => {
        const fetchSkill = async() => {
            try {
  const response = await AddSkill.List_Skill();
  setSkill(Array.isArray(response.data.results) ? response.data.results : []);
  setActiveView('search');
} catch (error) {
  console.error(error.response.results); // Add this to debug
  setError('Failed to fetch skills');
}

        }
        fetchSkill()
    }, [])
    
    // const deleteButton = async(skill) => {
    //     if(!user || !user.id) {
    //         setError('Invalid user data');
    //         setTimeout(() => setError(''), 3000);
    //         return;
    //     }
    //     try{
    //         const response = await AuthAPI.delete(user.id);
    //         setSuccess(response.data.message || 'User deleted successfully');
    //         setTimeout(() => setSuccess(''), 3000);
    //         console.log(response.data)
    //         await searchButton();
    //     } catch(error){
    //         setError(
    //          'Unable to delete user'
    //         )
    //         setTimeout(() => setError(''), 3000)
    //     }
    // }

    const searchButton = async () => {
        try {
            const response = await AuthAPI.users(searchskill);
            setSearchskill(response.data.results)
            setActiveView('search');
        } catch (error) {
            setError(

            )
        }
    }
    


    useEffect(() => {
      searchButton();
    },[])
    return(
        <>
            <DataContext.Provider value={{searchButton,
                skill, searchskill, 
              activeView, setActiveView, 
              responseData, handleSearchChange}}>
                {children}
            </DataContext.Provider>
        </>
    )
}