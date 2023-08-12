import { Link } from "react-router-dom"
import "./SideNav.css"
import { useState } from "react"
import AddPost from "../AddPost/AddPost"
import Modal from "../Modal/Modal"

const sideNavData = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Explore",
        link: "/explore-feeds"
    },
    {
        name: "Bookmark",
        link: "/bookmark"
    },
    {
        name: "Profile",
        link: "/profile"
    }
]
export const SideNav = ({ userId }) => {
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    return (
        <div className="sidenav__container">
            {sideNavData.length > 0 && sideNavData.map(({ name, link }) => (
                <div key={link} className="nav__links">
                    <Link to={link} className="nav__name">
                        {name}
                    </Link>
                </div>
            ))
            }
            <div className="post__btn" onClick={handleShowModal}>
                Create A Post
            </div>
            {
                showModal &&
                <Modal>
                    <AddPost userId={userId} handleCloseModal={handleCloseModal} />
                </Modal>
            }
        </div>
    )
}
