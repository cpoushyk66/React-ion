import React from "react";

function CharacterLink({selectCharacter, character}) {

    return (
        <div onClick={() => selectCharacter(character)} className="character-link" style={{"float": "left"}}>
            <p>{character.name + " " + character.title}</p>
            <div>
                <p>Class: {character.klass}</p>
                <p>Level: {character.xp / 10}</p>
                <p>Gold: {character.gold}</p>
            </div>
        </div>
    )
}

export default CharacterLink