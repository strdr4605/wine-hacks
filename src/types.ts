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

export enum ActionTypeEnum {
  FETCH_VINTAGES_SUCCESS = 'FETCH_VINTAGES_SUCCESS',
}

export interface IAction {
  type: ActionTypeEnum;
  payload?: any;
}

export enum CompareEnum {
  GREATER = '>',
  LOWER = '<'
}

export interface IQuestion {
  question: string;
  field: string;
  compare: CompareEnum;
}

export interface IRootState {
  wineList: IVintage[];
  questions: IQuestion[]
  score: number,
  round: Array<string>;
}