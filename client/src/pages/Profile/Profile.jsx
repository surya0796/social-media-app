import ProfileFeatures from "../../components/ProfileFeatures/ProfileFeatures"
import "./Profile.css"
const Profile = ({user}) => {
    return (
        <div className="profile__container">
            <ProfileFeatures user={user}/>
        </div>
    )
}

export default Profile