import {ThreeDots} from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
    INITIAL: 'INITIAL',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

const ProfileDetailsComp = props => {
    const {profileDetailsOfUser, profileApiStatus, retryProfileFetch} = props
    const {name,profileImageUrl,shortBio} = profileDetailsOfUser

    const renderProfileLoadingView = () => (
        <div className="profile-loader-container" data-testid="loader">
            <ThreeDots
                height="50"
                width="50"
                color="#ffffff"
                ariaLabel="profile-loading"
                visible
            />
        </div>
    )

    const renderProfileSuccessView = () => (
        <div className="profile-card">
            <img src={profileImageUrl} alt="profile" className="profile-image" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{shortBio}</p>
        </div>
    )

    const renderProfileFailureView = () => (
        <div className="error-container">
            <p className="error-message">
                Failed to load profile. Please try again.
            </p>
            <button
                type="button"
                onClick={retryProfileFetch}
                className="retry-button"
            >
                Retry
            </button>
        </div>
    )

    const renderProfileSection = () => {
        switch (profileApiStatus) {
            case apiStatusConstants.IN_PROGRESS:
                return renderProfileLoadingView()
            case apiStatusConstants.SUCCESS:
                return renderProfileSuccessView()
            case apiStatusConstants.FAILURE:
                return renderProfileFailureView()
            default:
                return null
        }
    }

    return renderProfileSection()
}

export default ProfileDetailsComp