import React, { ReactChild } from 'react';
import { IoMdCreate } from 'react-icons/io'
import Card from './Card';
import { Link } from 'react-router-dom';

const CardEditor = ({imageUrl, name, rarity, id ,enableIdFooter = false, children}: 
    { imageUrl: string, name: string, rarity: string, id: string ,
        enableIdFooter?: boolean, children?: ReactChild }) => (
    <Card 
        imageUrl={imageUrl}
        name={name}
        rarity={rarity}
    >
        <div >
            <Link 
                to={`/editWaifuRequest/${id}`}
                className="button button--full-width link-center-text" 
            >
                <IoMdCreate/>
            </Link>
            { children }
        </div>
    </Card>
);

export default CardEditor;
