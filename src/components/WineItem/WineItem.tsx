import React from "react";
import { IVintage } from "../../types";
import "./WineItem.css";

interface Props {
  vintage: IVintage;
  showInfo: boolean;
  onClick(id: number): void;
}

const wineInfo = (vintage: IVintage) => (
  <div>
    <p>Alcohol is: <strong>{vintage.alcohol}</strong></p>
    <p>Sugar is:  <strong>{vintage.alcohol}</strong></p>
    <p>Year:  <strong>{vintage.year}</strong></p>
    <p>Wine type:  <strong>{vintage.categorySimple.find(e => e)}</strong></p>
  </div>
)

export const WineItem: React.FC<Props> = ({ vintage, onClick, showInfo }) => (
  <div className="wine-item">
    <div className="wine-details">
      <img src={vintage.photo.url} alt="" />
      {showInfo && wineInfo(vintage)}
    </div>
    <button className="btn wine-vote" onClick={() => onClick(vintage.id)}>Vote this Wine</button>
  </div>)
