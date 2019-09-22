import { ActionTypeEnum, IAction, IRootState, CompareEnum } from "./types";
const wineJSON = require('./wineQuestions.json');

export const initialState: IRootState = {
  wineList: {},
  questions: wineJSON,
  score: 0,
  round: {},
};

export function reducer(state: IRootState, action: IAction): IRootState {
  switch (action.type) {
    case ActionTypeEnum.FETCH_VINTAGES_SUCCESS:
      return {
        ...state,
        wineList: action.payload ? action.payload : {},
      }
    case ActionTypeEnum.UPDATE_ROUND:
      return {
        ...state,
        round: action.payload ? action.payload : {},
      }
    default:
      return state;
  }
}
