import React, {useEffect, useState} from "react";
import Spell from "./Spell";


function Academy({currrentUser, currrentCharacter}) {

    const [spells, setSpells] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/spells")
        .then(res => res.json())
        .then(setSpells)
    }, [])

    function makeSpells () {
        return spells.map(spell => <Spell key={spell.id + spell.name} currentCharacter={currrentCharacter} spell={spell} />)
    }
    return(
        <div className="academy-display">
            <h1>Welcometo the Academy!</h1>
            <h2>Train up new characters!</h2>

            <div>
            {makeSpells()}
            </div>
        
        </div>
    )
}

export default Academy