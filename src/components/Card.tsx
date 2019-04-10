import React from 'react';

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

export default Card;