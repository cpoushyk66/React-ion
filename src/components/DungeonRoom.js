import React, {useState, useEffect} from "react";

function DungeonRoom() {

    const [enemy, setEnemy] = useState({})

    useEffect(() => {
        fetch("http://localhost:9292/enemy/rand")
        .then(res => res.json())
        .then(prepEnemy)
    })

    function prepEnemy(enemy_default) {
        
        let tempEnemy = {...enemy_default}
        tempEnemy.hp_max = tempEnemy.constitution * 10
        tempEnemy.current_hp = tempEnemy.hp_max
        tempEnemy.mp_max = tempEnemy.intelligence * 10
        tempEnemy.current_mp = tempEnemy.mp_max

        setEnemy(tempEnemy)
        
    }
    return(
        <div>
            {enemy.hp_max != undefined ? <div>

                <h2>Enemy: {enemy.name} the {enemy.race}</h2>
                <h3>Health: {enemy.current_hp} / {enemy.hp_max}</h3>
                <div className="enemy-icon"></div>
            </div> : <p>Loading</p>}
        </div>
        )
}

export default DungeonRoom