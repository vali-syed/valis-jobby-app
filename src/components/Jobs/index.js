import Header from '../Header'
import ProfileDetailsComp from '../ProfileDetailsComp'
import {useEffect,useState} from 'react'
import Cookies from'js-cookie'

import './index.css'

const Jobs = () => {    

    const [profileDetailsOfUser,setProfileDetails] = useState({name:'',profileImageUrl:'',shortBio:''})

    useEffect(()=>{
        const jwtToken = Cookies.get("jwt_token");
        const url="https://apis.ccbp.in/profile"
        const options={
            headers:{
                Authorization:`Bearer ${jwtToken}`,
            },
            method:"GET",
        }
        fetch(url,options)
        .then(response => response.json())
        .then(data => {
            updateProfileDetailsOnSuccesc(data);
        })
        .catch(error => {
            console.error("Error:", error);
        })
    },[])

    const updateProfileDetailsOnSuccesc = data =>{
        const profileDetails = data.profile_details;
        const userDetails = {
            name:profileDetails.name,
            profileImageUrl:profileDetails.profile_image_url,
            shortBio:profileDetails.short_bio
        }
        setProfileDetails(userDetails);
    }

    const renderSideBar = () =>{
        return (
            <div className='side-bar'>
                <ProfileDetailsComp
                    profileDetailsOfUser={profileDetailsOfUser}
                />
            </div>
        )
    }

    return(
        <div>
            <Header/>
            <div className='job-page-container'>
                <div>
                    {renderSideBar()}
                </div>
            </div>
        </div>
    )
}

export default Jobs