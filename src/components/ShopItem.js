import React from "react";

function ShopItem({updateCurrentCharacter, character, buying, item}) {

    function handleBuy(e) {
        e.preventDefault()

        if (character.gold >= item.value)
        {
            fetch(`http://localhost:9292/shop/buy/${character.id}/${item.id}`)
            .then(res => res.json())
            .then(updateCurrentCharacter)
        }
        else
        {
            console.log("Broke")
        }
        
    }

    function handleSell(e)
    {
        e.preventDefault()

        if (item.sellable)
        {
            fetch(`http://localhost:9292/shop/sell/${character.id}/${item.id}`)
            .then(res => res.json())
            .then(updateCurrentCharacter)
        }
    }

    return (
        <div className="single" >
            <p>{item.name}</p>
            <p>{item.flavor_text}</p>
            <p>Cost {item.value} gold!</p>
            {buying ? <button onClick={handleBuy}>Buy</button> : <button onClick={handleSell} >{item.sellable ? "Sell" : "Unsellable"}</button>}
        </div>
    )
}

export default ShopItem