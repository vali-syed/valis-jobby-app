import Header from '../Header'
import ProfileDetailsComp from '../ProfileDetailsComp'
import {useEffect,useState,useCallback} from 'react'
import Cookies from'js-cookie'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const Jobs = () => {    

    const [profileDetailsOfUser,setProfileDetails] = useState({name:'',profileImageUrl:'',shortBio:''})
    const [jobsData,setJobsData] = useState([])
    const [isLoading, setIsLoading ] = useState(true)
    const [jobsError,setJobsError] = useState(null)
    const [profileError,setProfileError] = useState(null)

    const fetchProfileDetailsFromApi = useCallback(async () => {
        setProfileError(null) // Clear previous errors
        try {
            const jwtToken = Cookies.get("jwt_token");
            const url="https://apis.ccbp.in/profile"
            const options={
                headers:{
                    Authorization:`Bearer ${jwtToken}`,
                },
                method:"GET",
            }
            const response = await fetch(url,options)
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error_msg || 'Failed to fetch profile')
            }
            
            const data = await response.json()
            const profileDetails = data.profile_details;
            const userDetails = {
                name:profileDetails.name,
                profileImageUrl:profileDetails.profile_image_url,
                shortBio:profileDetails.short_bio
            }
            setProfileDetails(userDetails);
        }
        catch(error) {
            setProfileError(error.message || "Failed to load profile. Please try again.")
            console.error("Profile Error:", error);
        }
    }, []) // Empty deps - function doesn't depend on any props/state

    // Fetch Jobs Data Function (can be called on mount and retry)
    // ✅ Using useCallback because function is used in useEffect and as event handler
    const fetchJobsDataFromApi = useCallback(async () => {
        setIsLoading(true)
        setJobsError(null) // Clear previous errors
        try{
            const jwtToken = Cookies.get("jwt_token")
            const apiUrl = 'https://apis.ccbp.in/jobs'
            const options = {
                headers:{
                    Authorization : `Bearer ${jwtToken}`
                },
                method:"GET",
            }
            const response = await fetch(apiUrl,options)
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error_msg || 'Failed to fetch jobs')
            }
            
            const data = await response.json()
            setJobsData(data.jobs || [])
        }
        catch(err){
            setJobsError(err.message || "Something went wrong. Please try again.")
            console.error("Jobs Error:", err)
        }
        finally{
            setIsLoading(false)
        }
    }, []) // Empty deps - function doesn't depend on any props/state

    // Retry Functions - Simple wrappers
    const retryProfileFetch = () => {
        fetchProfileDetailsFromApi()
    }

    const retryJobsFetch = () => {
        fetchJobsDataFromApi()
    }

    // Initial fetch on component mount
    useEffect(()=>{
        fetchProfileDetailsFromApi()
        fetchJobsDataFromApi()
    }, [fetchProfileDetailsFromApi, fetchJobsDataFromApi]) // ✅ Now safe to include in deps

    return(
        <div>
            <Header/>
            <div className='job-page-container'>
                <div>
                    <div className='side-bar'>
                        {profileError ? (
                            <div className="error-container">
                                <p className="error-message">{profileError}</p>
                                <button 
                                    type="button"
                                    onClick={retryProfileFetch}
                                    className="retry-button"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <ProfileDetailsComp
                                profileDetailsOfUser={profileDetailsOfUser}
                            />
                        )}
                        <hr className='separator'/>
                        <FiltersGroup />
                    </div>
                    
                    {isLoading ? (
                        <div className="loading-container">
                            <p>Loading jobs...</p>
                        </div>
                    ) : jobsError ? (
                        <div className="error-container">
                            <p className="error-message">{jobsError}</p>
                            <button 
                                type="button"
                                onClick={retryJobsFetch}
                                className="retry-button"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="jobs-list">
                            {jobsData.length === 0 ? (
                                <p>No jobs found</p>
                            ) : (
                                <p>Found {jobsData.length} jobs</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs