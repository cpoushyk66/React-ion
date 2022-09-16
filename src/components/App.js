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
import LoginForm from "./LoginForm";
import Dungeon from "./Dungeon";

function App() {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [currentCharacter, setCurrentCharacter] = useState(null)
    const [newUsername, setUsername] = useState("")
    const [newPassword, setPassword] = useState("")
    const [newProfileImg, setProfileImg] = useState("")
    const [login, setLogin] = useState(false);
    const [loginUser, setLoginUser] = useState("")
    const [loginPass, setLoginPass] = useState("")


    useEffect(() => {
        fetch("http://localhost:9292/users")
        .then(res => res.json())
        .then(usersData => {
            setUsers(usersData)
            
        })
        console.log("wow")

    }, [currentCharacter])



    function handleLogin() {

        let user = users.find(user => user.username == loginUser && user.password == loginPass)
        
        if (user != undefined)
        {

            fetch(`http://localhost:9292/user/${user.id}/log_in`)
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
            
            setLoginUser('')
            setLoginPass('')
            setLogin(false)
            
        }
        else {
            setLoginPass("")
            alert("Invalid Username/Password!")
        }
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

    function handleUpdateLoginUser(e) {
        setLoginUser(e.target.value)
    }

    function handleUpdateLoginPass(e) {
        setLoginPass(e.target.value)
    }

    function handleLogOut() {
        setLogin(false)
        setCurrentUser(null)
        setCurrentCharacter(null)
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

        setUsername("")
        setPassword("")
        setProfileImg("")
    }

    function handleAddCharacter(e, character) {
        e.preventDefault()

        let newCharacter = {
            name: character.name,
            title: "",
            xp: 0,
            klass: character.klass,
            strength: character.strength,
            dexterity: character.dexterity,
            wisdom: character.wisdom,
            constitution: character.constitution,
            intelligence: character.intelligence,
            charisma: character.charisma,
            gold: 25,
            user_id: currentUser.id

        }

        fetch("http://localhost:9292/characters", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCharacter)
        })
        .then(res => res.json())
        .then(updateCurrentCharacter)
    }


    return(
        <div className={`App`}>
            <Navbar/>
            {currentUser == null ? <div className="login-buttons newUserForm">
                 <button className="button" onClick={() => setLogin(true)}>Log In</button> 
                <button className="button" onClick={() => {
                    setLogin(false)
                    setCurrentUser(null)
                }}>Sign Up</button>
                
            </div> : null}
            {currentUser != null ? <ProfileBar handleLogOut={handleLogOut} selectCharacter={selectCharacter} users={users} currentUser={currentUser} handleCurrentUser={handleCurrentUser}/> :
            login ? <LoginForm handleLogin={handleLogin} loginUser={loginUser} onChangeUsername={handleUpdateLoginUser} onChangePassword={handleUpdateLoginPass} loginPass={loginPass} />
            : <CreateUserForm handleAddUser={handleAddUser} newUsername={newUsername} onChangeUsername={handleUpdateFormUsername} newPassword={newPassword} onChangePassword={handleUpdateFormPassword} newProfileImg={newProfileImg} onChangeProfileImg={handleUpdateFormProfileImg}/>}
            
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/town" element={<Town/>} />
                <Route path="shop" element={<Shop updateCurrentCharacter={updateCurrentCharacter} currentCharacter={currentCharacter}/>} />
                <Route path="/academy" element={<Academy handleAddCharacter={handleAddCharacter} currentUser={currentUser} currentCharacter={currentCharacter} />} />
                <Route path="/dungeon" element={<Dungeon currentUser={currentUser} currentCharacter={currentCharacter} />} />
            </Routes>
        </div>
    )
}

export default App