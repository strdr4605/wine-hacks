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
    <p>Alcohol is: {vintage.alcohol}</p>
    <p>Sugar is: {vintage.alcohol}</p>
    <p>Year: {vintage.year}</p>
    <p>Wine type: {vintage.categorySimple.find(e => e)}</p>
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
