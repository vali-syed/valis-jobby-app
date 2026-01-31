import './index.css'

const ProfileDetailsComp = props => {
    const {profileDetailsOfUser} = props
    const {name,profileImageUrl,shortBio} = profileDetailsOfUser
    return (
        <div className="profile-card">
            <img src={profileImageUrl} alt="profile-img"/>
            <h1>{name}</h1>
            <p>{shortBio}</p>
        </div>
    )
}

export default ProfileDetailsComp