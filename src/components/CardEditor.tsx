import React from 'react';
import Card from './Card';

const CardEditor = ({imageUrl, name, rarity, id ,enableIdFooter = false}: 
    { imageUrl: string, name: string, rarity: string, id: string ,enableIdFooter?: boolean }) => (
    <div>
        <Card 
            imageUrl={imageUrl}
            name={name}
            rarity={rarity}
        />
    </div>
);

export default CardEditor;
