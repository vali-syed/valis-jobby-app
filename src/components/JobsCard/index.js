import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
    const {jobDetails} = props
    const {
        companyLogoUrl,
        title,
        rating,
        location,
        employmentType,
        packagePerAnnum,
        jobDescription,
    } = jobDetails

    return (
        <li className="job-card">
            <div className="job-card-header">
                <img
                    src={companyLogoUrl}
                    alt="company logo"
                    className="company-logo"
                />
                <div className="job-title-rating">
                    <h1 className="job-title">{title}</h1>
                    <div className="job-rating">
                        <AiFillStar className="star-icon" />
                        <p className="rating-text">{rating}</p>
                    </div>
                </div>
            </div>
            <div className="job-card-meta">
                <div className="job-location-type">
                    <div className="job-location">
                        <MdLocationOn className="meta-icon" />
                        <p className="meta-text">{location}</p>
                    </div>
                    <div className="job-employment-type">
                        <BsBriefcaseFill className="meta-icon" />
                        <p className="meta-text">{employmentType}</p>
                    </div>
                </div>
                <p className="job-package">{packagePerAnnum}</p>
            </div>
            <hr className="job-card-separator" />
            <div className="job-description-section">
                <h1 className="job-description-heading">Description</h1>
                <p className="job-description-text">{jobDescription}</p>
            </div>
        </li>
    )
}

export default JobsCard
