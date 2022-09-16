import React from "react";

function LoginForm({handleLogin, onChangeUsername, onChangePassword, loginUser, loginPass}) {

    return (
        <div className="newUserFormAll">
            <h2>Log In here!</h2>
            <form onSubmit={handleLogin} className="newUserForm">
                <input onChange={onChangeUsername}  value={loginUser} type="text" placeholder="username..." required/>
                <input onChange={onChangePassword} value={loginPass} type="password" placeholder="password" required/>
                <button type="submit">Join the Adventure!</button>
            </form>
        </div>
    )
}

export default LoginForm