import React from 'react';
import { IVintage } from '../WineList';

interface Props {
    vintage: IVintage;
}

export const WineItem: React.FC<Props> = ({ vintage }) => (
    <div className="wine-item">
        <p>ID:  {vintage.id}</p>
        <img src={vintage.photo.url} alt="" />
        <p>Alcohol is: {vintage.alcohol}</p>
        <p>Sugar is: {vintage.alcohol}</p>
        <p>Year: {vintage.year}</p>
        <p></p>
    </div>)