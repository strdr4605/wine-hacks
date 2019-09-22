import changeCase from "change-case";
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
    <p>
      Alcohol is: <strong>{vintage.alcohol}</strong>
    </p>
    <p>
      Sugar is: <strong>{vintage.alcohol}</strong>
    </p>
    <p>
      Year: <strong>{vintage.year}</strong>
    </p>
    <p>
      Wine type: <strong>{vintage.categorySimple.find(e => e)}</strong>
    </p>
  </div>
);

function getName(vintage: IVintage) {
  const kebabCaseName: string = vintage.photo
    ? vintage.photo.name.split(".")[0]
    : "No Name";
  return changeCase.titleCase(kebabCaseName);
}

export const WineItem: React.FC<Props> = ({ vintage, onClick, showInfo }) => (
  <div className="wine-item">
    <div className="wine-details">
      <img src={vintage.photo.url} alt="" />
      <p>{getName(vintage)}</p>
      {showInfo && wineInfo(vintage)}
    </div>
    <button
      disabled={showInfo}
      className="btn wine-vote"
      onClick={() => onClick(vintage.id)}
    >
      Vote this Wine
    </button>
  </div>
);
