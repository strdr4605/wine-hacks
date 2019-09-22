import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import { reducer, initialState } from './reducer';
import { IVintage, ActionTypeEnum, CompareEnum } from './types';
import { WineItem, WineQuestion } from './components';

const App: React.FC = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    document.title = "WineQuiz";
    fetchWine();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Object.keys(state.wineList).length) {
      const objKeysArray: Array<number> = Object.keys(state.wineList).map(key =>
        Number(key)
      );

      const newRound: number[] = objKeysArray
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      dispatch({ type: ActionTypeEnum.UPDATE_ROUND, payload: newRound });
    }
  }, [state.wineList]);

  async function fetchWine(): Promise<void> {
    const a: any = new Array(13).fill(1).map((_, i) => i + 1);
    const vintPromises: Promise<IVintage>[] = [];

    for (const i of a) {
      const vintPromise: Promise<IVintage> = fetch(
        `https://app.gustos.life/en/api/v1/vintage/${i}`
      ).then(res => res.json());
      vintPromises.push(vintPromise);
    }

    const vintages: IVintage[] = await Promise.all(vintPromises);
    const vintagesObj: Record<number, IVintage> = vintages.reduce(
      (acc: Record<number, IVintage>, vint: IVintage) => {
        acc[vint.id] = vint;
        return acc;
      },
      {}
    );
    dispatch({
      type: ActionTypeEnum.FETCH_VINTAGES_SUCCESS,
      payload: vintagesObj
    });
  }

  function onClickHandle(id: number): void {
    const firstWine: IVintage = state.wineList[state.round[0]]
    const secondWine: IVintage = state.wineList[state.round[1]]

    if (state.questions[0].compare === CompareEnum.OLDER) {
      const field: string = state.questions[0].field;
      // @ts-ignore
      const winner: number = firstWine[field] <= secondWine[field] ? firstWine.id : secondWine.id;

      if (id === winner) {
        setShowInfo(true);
        alert('Corrent')
      } else {
        alert('Lost')
      }
    }
  }

  return (
    <div className="App">
      <WineQuestion question={state.questions[0]} />
      {Object.keys(state.wineList).length > 0 && state.round.length > 0 &&
        (<div className="quiz-section">
          <WineItem showInfo={showInfo} vintage={state.wineList[state.round[0]]} onClick={onClickHandle} />
          <h1>VS</h1>
          <WineItem showInfo={showInfo} vintage={state.wineList[state.round[1]]} onClick={onClickHandle} />
        </div>)}
  { console.log(state) }
    </div >
  );
};

export default App;
