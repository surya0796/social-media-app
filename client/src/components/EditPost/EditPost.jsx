import React from 'react'
import AddPost from '../AddPost/AddPost'
import Modal from '../Modal/Modal'

const EditPost = ({ userId, handleCloseModal, editPost }) => {
    return (
        <Modal>
            <AddPost userId={userId} handleCloseModal={handleCloseModal} editPost={editPost} />
        </Modal>
    )
}

export default EditPost