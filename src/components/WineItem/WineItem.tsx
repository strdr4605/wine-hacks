import React from "react";
import { IVintage } from "../../types";
import "./WineItem.css";

interface Props {
  vintage: IVintage;
  onClick(name: string): void;
}

export const WineItem: React.FC<Props> = ({
  vintage,
  onClick
}: Props): React.ReactElement => (
  <div className="wine-item">
    <div className="wine-details">
      <img src={vintage.photo.url} alt="" />
      <p>Alcohol is: {vintage.alcohol}</p>
      <p>Sugar is: {vintage.alcohol}</p>
      <p>Year: {vintage.year}</p>
    </div>
    <button
      className="btn wine-vote"
      onClick={(): void => onClick(vintage.photo.name)}
    >
      Vote this Wine
    </button>
  </div>
);
