import React from 'react';

const getRarityStringFromInt = (rarity: Number) => {
    switch(rarity) {
        case 0: 
            return "Common";
        case 1: 
            return "Uncommon";
        case 2: 
            return "Rare";
        case 3: 
            return "Epic";
        case 99: 
            return "Ultimate Waifu";
        case 98: 
            return "Special";
        default:
            return "Common";
    }
};

const Card = ({imageUrl, name, rarity, enableIdFooter = false}: 
    { imageUrl: string, name: string, rarity: string, enableIdFooter?: boolean }) => (
    <div className="card">
        <div className="crop pop">
            <img src={imageUrl ? imageUrl : 
                "https://cdn.argonaut.pw/lxvFBNdShIvb4efQvT60d99iXlN4TFXe.png"} 
                alt="Waifu Image"/>
        </div>
        <div className="card-body card-body--title">
            <h5 className="card-title">{name ? name : 'Name' }</h5>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">{rarity}</li>
        </ul>
        { enableIdFooter && 
            <div className="card-body card-body--id">
                <p className="card-text"><span className="waifuId">ID: 1</span></p>
            </div>
        }
    </div>
);

export {Card as default, getRarityStringFromInt};