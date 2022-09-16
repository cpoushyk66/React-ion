import React from "react";
import CharacterLink from "./CharacterLinks";

function ProfileBar({handleLogOut, selectCharacter, users, currentUser, handleCurrentUser})
{
    
    let characterLinks = currentUser.characters.map(character => <CharacterLink key={character.name + character.id} selectCharacter={selectCharacter} character={character}/>)



    return(
        <div className="user-display">

            <h2>Welcome back, {currentUser.username}!</h2>
            <div className="links-container">{characterLinks}</div>
            <div className="player-icon">
                <img src={currentUser != null ? currentUser.img_url : ""} alt="user image" />
                <p>{currentUser.username}</p>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default ProfileBar