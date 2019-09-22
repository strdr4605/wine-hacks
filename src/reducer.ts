import { ActionTypeEnum, IAction, IRootState } from "./types";

export const initialState: IRootState = {
  wineList: {},
  questions: [],
  score: 0,
  round: [],
};

export function reducer(state: IRootState, action: IAction): IRootState {
  switch (action.type) {
    case ActionTypeEnum.FETCH_VINTAGES_SUCCESS:
      return {
        ...state,
        wineList: action.payload ? action.payload : {}
      };
    case ActionTypeEnum.UPDATE_ROUND:
      return {
        ...state,
        round: action.payload ? action.payload : []
      };
    default:
      return state;
  }
}
