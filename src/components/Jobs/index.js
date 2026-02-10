import Header from '../Header'
import ProfileDetailsComp from '../ProfileDetailsComp'
import JobsCard from '../JobsCard'
import {useEffect,useState,useCallback} from 'react'
import Cookies from'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
    INITIAL: 'INITIAL',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

const Jobs = () => {    

    const [profileDetailsOfUser,setProfileDetails] = useState({
        name:'',
        profileImageUrl:'',
        shortBio:'',
    })
    const [profileApiStatus, setProfileApiStatus] = useState(apiStatusConstants.INITIAL)

    const [jobsData,setJobsData] = useState([])
    const [jobsApiStatus, setJobsApiStatus] = useState(apiStatusConstants.INITIAL)

    const fetchProfileDetailsFromApi = useCallback(async () => {
        setProfileApiStatus(apiStatusConstants.IN_PROGRESS)
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
            console.error("Profile Error:", error);
            setProfileApiStatus(apiStatusConstants.FAILURE)
            return
        }
        setProfileApiStatus(apiStatusConstants.SUCCESS)
    }, [])

    const fetchJobsDataFromApi = useCallback(async () => {
        setJobsApiStatus(apiStatusConstants.IN_PROGRESS)
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
            const updatedJobsData = (data.jobs || []).map(eachJob => ({
                id: eachJob.id,
                title: eachJob.title,
                rating: eachJob.rating,
                companyLogoUrl: eachJob.company_logo_url,
                employmentType: eachJob.employment_type,
                location: eachJob.location,
                packagePerAnnum: eachJob.package_per_annum,
                jobDescription: eachJob.job_description,
            }))
            setJobsData(updatedJobsData)
        }
        catch(err){
            console.error("Jobs Error:", err)
            setJobsApiStatus(apiStatusConstants.FAILURE)
            return
        }
        setJobsApiStatus(apiStatusConstants.SUCCESS)
    }, []) 

    const retryProfileFetch = () => {
        fetchProfileDetailsFromApi()
    }

    const retryJobsFetch = () => {
        fetchJobsDataFromApi()
    }

    
    const renderJobsLoadingView = () => (
        <div className="loader-container" data-testid="loader">
            <div><ThreeDots
                height="50"
                width="50"
                color="#ffffff"
                ariaLabel="jobs-loading"
                visible
            /></div>
        </div>
    )

    const renderNoJobsView = () => (
        <div className="no-jobs-view">
            <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="no-jobs-image"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-description">
                We could not find any jobs. Try other filters.
            </p>
        </div>
    )

    const renderJobsFailureView = () => (
        <div className="jobs-failure-view">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="jobs-failure-image"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
                We cannot seem to find the page you are looking for.
            </p>
            <button
                type="button"
                onClick={retryJobsFetch}
                className="retry-button"
            >
                Retry
            </button>
        </div>
    )

    const renderJobsListView = () => {
        if (jobsData.length === 0) {
            return renderNoJobsView()
        }

        return (
            <ul className="jobs-list">
                {jobsData.map(eachJob => (
                    <JobsCard key={eachJob.id} jobDetails={eachJob} />
                ))}
            </ul>
        )
    }

    const renderJobsSection = () => {
        switch (jobsApiStatus) {
            case apiStatusConstants.IN_PROGRESS:
                return renderJobsLoadingView()
            case apiStatusConstants.SUCCESS:
                return renderJobsListView()
            case apiStatusConstants.FAILURE:
                return renderJobsFailureView()
            default:
                return null
        }
    }

    useEffect(()=>{
        fetchProfileDetailsFromApi()
        fetchJobsDataFromApi()
    }, [fetchProfileDetailsFromApi, fetchJobsDataFromApi]) 

    return(
        <div>
            <Header/>
            <div className='job-page-container'>
                <div className="side-bar">
                    <ProfileDetailsComp
                        profileDetailsOfUser={profileDetailsOfUser}
                        profileApiStatus={profileApiStatus}
                        retryProfileFetch={retryProfileFetch}
                    />
                    <hr className='separator'/>
                    <FiltersGroup />
                </div>
                <div className="jobs-section">
                    {renderJobsSection()}
                </div>
            </div>
        </div>
    )
}

export default Jobs