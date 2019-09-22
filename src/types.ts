export interface IVintage {
  id: number;
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
  UPDATE_ROUND = 'UPDATE_ROUND',
}

export interface IAction {
  type: ActionTypeEnum;
  payload?: any;
}

export enum CompareEnum {
  MORE = '>',
  LESS = '<'
}

export interface IQuestion {
  question: string;
  field: string;
  compare: CompareEnum;
}

export interface IRound {
  question?: IQuestion;
  players?: number[];
}

export interface IRootState {
  wineList: Record<number, IVintage>;
  questions: IQuestion[]
  score: number,
  round: IRound;
}