import {useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
    INITIAL: 'INITIAL',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

const JobDetails = () => {
    const {id} = useParams()

    const [jobDetails, setJobDetails] = useState(null)
    const [similarJobs, setSimilarJobs] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL)

    const formatJobDetails = data => ({
        id: data.id,
        title: data.title,
        rating: data.rating,
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        jobDescription: data.job_description,
        skills: data.skills.map(eachSkill => ({
            name: eachSkill.name,
            imageUrl: eachSkill.image_url,
        })),
        lifeAtCompany: {
            description: data.life_at_company.description,
            imageUrl: data.life_at_company.image_url,
        },
    })

    const formatSimilarJob = data => ({
        id: data.id,
        title: data.title,
        rating: data.rating,
        companyLogoUrl: data.company_logo_url,
        employmentType: data.employment_type,
        location: data.location,
        jobDescription: data.job_description,
    })

    const fetchJobDetails = useCallback(async () => {
        setApiStatus(apiStatusConstants.IN_PROGRESS)
        try {
            const jwtToken = Cookies.get('jwt_token')
            const url = `https://apis.ccbp.in/jobs/${id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }

            const response = await fetch(url, options)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error_msg || 'Failed to fetch job details')
            }

            const data = await response.json()
            const updatedJobDetails = formatJobDetails(data.job_details)
            const updatedSimilarJobs = data.similar_jobs.map(eachJob =>
                formatSimilarJob(eachJob),
            )

            setJobDetails(updatedJobDetails)
            setSimilarJobs(updatedSimilarJobs)
            setApiStatus(apiStatusConstants.SUCCESS)
        } catch (error) {
            console.error('Job Details Error:', error)
            setApiStatus(apiStatusConstants.FAILURE)
        }
    }, [id])

    useEffect(() => {
        fetchJobDetails()
    }, [fetchJobDetails])

    const renderLoadingView = () => (
        <div className="loader-container" data-testid="loader">
            <ThreeDots
                height="50"
                width="50"
                color="#ffffff"
                ariaLabel="job-details-loading"
                visible
            />
        </div>
    )

    const renderFailureView = () => (
        <div className="job-details-failure-view">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="job-details-failure-image"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
                We cannot seem to find the page you are looking for.
            </p>
            <button
                type="button"
                className="retry-button"
                onClick={fetchJobDetails}
            >
                Retry
            </button>
        </div>
    )

    const renderSkillsSection = skills => (
        <div className="skills-section">
            <h1 className="section-heading">Skills</h1>
            <ul className="skills-list">
                {skills.map(eachSkill => (
                    <li key={eachSkill.name} className="skill-item">
                        <img
                            src={eachSkill.imageUrl}
                            alt={eachSkill.name}
                            className="skill-image"
                        />
                        <p className="skill-name">{eachSkill.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

    const renderLifeAtCompanySection = lifeAtCompany => (
        <div className="life-at-company-section">
            <div className="life-at-company-text">
                <h1 className="section-heading">Life at Company</h1>
                <p className="life-at-company-description">
                    {lifeAtCompany.description}
                </p>
            </div>
            <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-image"
            />
        </div>
    )

    const renderSimilarJobsSection = () => (
        <div className="similar-jobs-section">
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-list">
                {similarJobs.map(eachJob => (
                    <li key={eachJob.id} className="similar-job-card">
                        <div className="similar-job-header">
                            <img
                                src={eachJob.companyLogoUrl}
                                alt="similar job company logo"
                                className="company-logo"
                            />
                            <div className="job-title-rating">
                                <h1 className="job-title">{eachJob.title}</h1>
                                <div className="job-rating">
                                    <AiFillStar className="star-icon" />
                                    <p className="rating-text">{eachJob.rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className="job-location-type">
                            <div className="job-location">
                                <MdLocationOn className="meta-icon" />
                                <p className="meta-text">{eachJob.location}</p>
                            </div>
                            <div className="job-employment-type">
                                <BsBriefcaseFill className="meta-icon" />
                                <p className="meta-text">
                                    {eachJob.employmentType}
                                </p>
                            </div>
                        </div>
                        <h1 className="job-description-heading">Description</h1>
                        <p className="job-description-text">
                            {eachJob.jobDescription}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )

    const renderJobDetailsView = () => {
        if (!jobDetails) {
            return null
        }

        const {
            companyLogoUrl,
            title,
            rating,
            companyWebsiteUrl,
            employmentType,
            location,
            packagePerAnnum,
            jobDescription,
            skills,
            lifeAtCompany,
        } = jobDetails

        return (
            <div className="job-details-content">
                <div className="job-details-card">
                    <div className="job-card-header">
                        <img
                            src={companyLogoUrl}
                            alt="job details company logo"
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
                    <div className="job-description-header">
                        <h1 className="job-description-heading">Description</h1>
                        <a
                            href={companyWebsiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="visit-link"
                        >
                            Visit <FiExternalLink className="external-link-icon" />
                        </a>
                    </div>
                    <p className="job-description-text">{jobDescription}</p>
                    {renderSkillsSection(skills)}
                    {renderLifeAtCompanySection(lifeAtCompany)}
                </div>
                {renderSimilarJobsSection()}
            </div>
        )
    }

    const renderJobDetailsSection = () => {
        switch (apiStatus) {
            case apiStatusConstants.IN_PROGRESS:
                return renderLoadingView()
            case apiStatusConstants.SUCCESS:
                return renderJobDetailsView()
            case apiStatusConstants.FAILURE:
                return renderFailureView()
            default:
                return null
        }
    }

    return (
        <div className="job-details-page">
            <Header />
            <div className="job-details-bg">{renderJobDetailsSection()}</div>
        </div>
    )
}

export default JobDetails