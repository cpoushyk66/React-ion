import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import Navbar from "./NavBar";
import Home from "./Home";
import Town from "./Town";
import ProfileBar from "./ProfileBar";
import CreateUserForm from "./CreateUserForm";
import Shop from "./Shop";
import Academy from "./Academy";

function App() {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [currentCharacter, setCurrentCharacter] = useState(null)
    const [newUsername, setUsername] = useState("")
    const [newPassword, setPassword] = useState("")
    const [newProfileImg, setProfileImg] = useState("")


    useEffect(() => {
        fetch("http://localhost:9292/users")
        .then(res => res.json())
        .then(usersData => {
            setUsers(usersData)
            if (currentUser == null) {first_login(usersData[0])}
        })
        console.log("wow")

    }, [currentCharacter])



    function first_login(user) {

        fetch(`http://localhost:9292/user/${user.id}`)
        .then(res => res.json())
        .then(user2 => {
            setCurrentUser(user2)
            if (user2.characters != null && user2.last_character_used != null)
            {
                fetch(`http://localhost:9292/character/${user2.characters[0].id}`)
                .then(res => res.json())
                .then(setCurrentCharacter)
            }
            else if (user2.characters.length > 0)
            {
                fetch(`http://localhost:9292/character/${user2.characters[0].id}/set-as-last`)
                .then(res => res.json())
                .then(setCurrentCharacter)
            }
        })    

    }

    function updateCurrentCharacter(char) {
        setCurrentCharacter(char)
        updateCurrentUser()
    }

    function updateCurrentUser() {
        fetch(`http://localhost:9292/user/${currentUser.id}`)
        .then(res => res.json())
        .then(setCurrentUser)
    }

    //User Functions
    function handleCurrentUser(user)
    {
        fetch(`http://localhost:9292/user/${user.id}/log_in`)
        .then(res => res.json())
        .then(userF => {
            setCurrentUser(userF)
            let tempUsers = [...users]
            return tempUsers.map(userM => {
                if (userM.id == userF.id) 
                {
                    userM.last_logged_in = userF.last_logged_in
                }
                return userM
            })
        })

    }

    function selectCharacter(char) {
        console.log("boop")
        fetch(`http://localhost:9292/character/${char.id}`)
        .then(res => res.json())
        .then(setCurrentCharacter)

    }

    function handleUpdateFormUsername(e) {
        setUsername(e.target.value)
    }

    function handleUpdateFormPassword(e) {
        setPassword(e.target.value)
    }

    function handleUpdateFormProfileImg(e) {
        setProfileImg(e.target.value)
    }

    function handleAddUser(e) {
        e.preventDefault()
        let newUser = {
            username: newUsername,
            password: newPassword,
            img_url: newProfileImg
        }

        fetch("http://localhost:9292/users", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(user => setUsers([...users, user]))
    }


    return(
        <div className={`App`}>
            <Navbar/>
            {users.length > 0 && currentUser != null ? <ProfileBar selectCharacter={selectCharacter} users={users} currentUser={currentUser} handleCurrentUser={handleCurrentUser}/> :
            <CreateUserForm handleAddUser={handleAddUser} newUsername={newUsername} onChangeUsername={handleUpdateFormUsername} newPassword={newPassword} onChangePassword={handleUpdateFormPassword} newProfileImg={newProfileImg} onChangeProfileImg={handleUpdateFormProfileImg}/>}
            
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/town" element={<Town/>} />
                <Route path="shop" element={<Shop updateCurrentCharacter={updateCurrentCharacter} currentCharacter={currentCharacter}/>} />
                <Route path="/academy" element={<Academy currentUser={currentUser} currentCharacter={currentCharacter} />} />
            </Routes>
        </div>
    )
}

export default App