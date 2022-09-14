import { Action } from "redux";
import { RootState } from "./store";

const API_ACTION_MATCHER = new RegExp(/(.*)(pending|fulfilled|rejected)/);

interface LoadinUnit {
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
}

export const loadingReducer = (
  state = {},
  action: Action<string>
): Record<string, LoadinUnit> => {
  const { type } = action;

  const matches = API_ACTION_MATCHER.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: {
      pending: requestState === "pending",
      fulfilled: requestState === "fulfilled",
      rejected: requestState === "rejected",
    },
  };
};

export const makeLoadingSelector = (key: string) => (state: RootState) => {
  const sele =
    state.loading[(key.match(API_ACTION_MATCHER) as RegExpMatchArray)[1]];

  if (!sele) {
    return {
      pending: false,
      fulfilled: false,
      rejected: false,
    };
  }
  return sele;
};
