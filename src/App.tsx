import React, { useReducer, useEffect } from 'react';
import './App.css';
import { reducer, initialState } from './reducer';
import { IVintage, ActionTypeEnum } from './types';
import { WineItem } from './components';

const App: React.FC = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchWine();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Object.keys(state.wineList).length){
      const objKeysArray: Array<number> = Object.keys(state.wineList).map(key => Number(key))

      const newRound = objKeysArray.sort(() => .5 - Math.random()).slice(0,2);
      
      dispatch({type: ActionTypeEnum.UPDATE_ROUND, payload: newRound })
    }
  }, [state.wineList]);

  async function fetchWine() {
    const a: any = new Array(10).fill(1).map((_, i) => i + 1);
    const vintPromises: Promise<IVintage>[] = [];

    for (const i of a) {
      const vintPromise: Promise<IVintage> = fetch(`https://app.gustos.life/en/api/v1/vintage/${i}`)
        .then(res => res.json())
      vintPromises.push(vintPromise)
    }

    const vintages: IVintage[] = await Promise.all(vintPromises)
    const vintagesObj: Record<number, IVintage> = vintages.reduce((acc: Record<number, IVintage>, vint: IVintage) => {
      acc[vint.id] = vint;
      return acc;
    }, {})
    dispatch({ type: ActionTypeEnum.FETCH_VINTAGES_SUCCESS, payload: vintagesObj })
  }

  return (
    <div className="App">
      {Object.keys(state.wineList).length > 0 && state.round.length > 0 && 
      (<div className="quiz-section">
        <WineItem vintage={state.wineList[state.round[0]]} />
        <WineItem vintage={state.wineList[state.round[1]]} /> 
      </div>)}
      {console.log(state)}
    </div>
  );
};

export default App;
