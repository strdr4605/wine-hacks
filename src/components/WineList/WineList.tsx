import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import './WineList.css';
import { WineItem } from '../WineItem';

export interface IVintage {
  id: string;
  photo: {
    name: string;
    url: string;
  }
  alcohol: number;
  sugar: number;
  year: number;
  categorySimple: string[];
}

export const WineList: React.FC = () => {
  const [vintages, setVintages]: [IVintage[], Dispatch<SetStateAction<IVintage[]>>] = useState<IVintage[]>([]);

  useEffect(() => {
    fetchWine();
    // eslint-disable-next-line
  }, []);

  async function fetchWine() {
    const a: any = new Array(10).fill(1).map((_, i) => i + 1);
    const v: IVintage[] = [];
    for (const i of a) {
      const vin: IVintage = await fetch(`https://app.gustos.life/en/api/v1/vintage/${i}`)
        .then(res => res.json())
      v.push(vin)
    }

    setVintages(v);
  }


  return (
    <div>
      {vintages.map(vintage => <WineItem key={vintage.id} vintage={vintage} />)}
    </div>
  );
}
