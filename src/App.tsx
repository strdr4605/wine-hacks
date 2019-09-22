import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import { Footer, WineItem, WineQuestion } from "./components";
import { initialState, reducer } from "./reducer";
import {
  ActionTypeEnum,
  CompareEnum,
  IQuestion,
  IRound,
  IVintage
} from "./types";

const App: React.FC = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showInfo, setShowInfo] = useState(false);

  let firstIndex: number = 1;
  let secondIndex: number = 2;

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

      const players: number[] = objKeysArray
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      const randomQuestion: IQuestion =
        state.questions[Math.floor(Math.random() * state.questions.length)];
      const newRound: IRound = { question: randomQuestion, players };
      dispatch({ type: ActionTypeEnum.UPDATE_ROUND, payload: newRound });

      firstIndex = players[0];
      secondIndex = players[1];
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
    const firstWine: IVintage = state.wineList[firstIndex];
    const secondWine: IVintage = state.wineList[secondIndex];

    if (state.questions[0].compare === CompareEnum.MORE) {
      const field: string = state.questions[0].field;
      const winner: number =
        // @ts-ignore
        firstWine[field] <= secondWine[field] ? firstWine.id : secondWine.id;

      if (id === winner) {
        setShowInfo(true);
        alert("Corrent");
      } else {
        alert("Lost");
      }
    }
  }

  return (
    <div className="App">
      {state.round.question && <WineQuestion question={state.round.question} />}
      {Object.keys(state.wineList).length > 0 &&
        state.round.players &&
        state.round.players.length > 0 && (
          <div className="quiz-section">
            <WineItem
              showInfo={showInfo}
              vintage={state.wineList[firstIndex]}
              onClick={onClickHandle}
            />
            <h1>VS</h1>
            <WineItem
              showInfo={showInfo}
              vintage={state.wineList[secondIndex]}
              onClick={onClickHandle}
            />
          </div>
        )}
      {console.log(state)}
      <Footer />
    </div>
  );
};

export default App;
