import React from "react";

function CreateUserForm({handleAddUser, newUsername, onChangeUsername, newPassword, onChangePassword, newProfileImg, onChangeProfileImg}) {

    return (
        <div className="newUserFormAll">
            <h2>Sign Up here!</h2>
            <form onSubmit={handleAddUser} className="newUserForm">
                <input onChange={onChangeUsername}  value={newUsername} type="text" placeholder="username..." required/>
                <input onChange={onChangePassword} value={newPassword} type="password" placeholder="password" required/>
                <input onChange={onChangeProfileImg} value={newProfileImg} type="text" placeholder="img url..." required/>
                <button type="submit">Join the Adventure!</button>
            </form>
        </div>
    )
}

export default CreateUserForm