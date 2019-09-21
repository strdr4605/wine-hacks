import React, { useReducer, useEffect } from 'react';
import './App.css';
import { reducer, initialState } from './reducer';
import { IVintage, ActionTypeEnum } from './types';

const App: React.FC = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchWine();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
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
    dispatch({ type: ActionTypeEnum.FETCH_VINTAGES_SUCCESS, payload: vintages })
  }

  return (
    <div className="App">
      {/* <Question /> */}
      <div className="quiz-section">
        {/* <WineItem /> */}
        {/* <WineItem /> */}
        {console.log(state)}
      </div>
    </div>
  );
};

export default App;
