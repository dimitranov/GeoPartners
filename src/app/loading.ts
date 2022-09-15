import { Action } from "redux";
import { RootState } from "./store";

const API_ACTION_MATCHER = new RegExp(/(.*)(REQUEST|SUCCESS|ERROR)/);

interface LoadingStateDescriptor {
  pending: boolean;
  fulfilled: boolean;
  rejected: boolean;
}

export const loadingReducer = (
  state = {},
  action: Action<string>
): Record<string, LoadingStateDescriptor> => {
  const { type } = action;

  const matches = API_ACTION_MATCHER.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: {
      pending: requestState === "REQUEST",
      fulfilled: requestState === "SUCCESS",
      rejected: requestState === "ERROR",
    },
  };
};

export const makeLoadingSelector = (key: string) => (state: RootState) => {
  const selector =
    state.loading[(key.match(API_ACTION_MATCHER) as RegExpMatchArray)[1]];

  if (!selector) {
    return {
      pending: false,
      fulfilled: false,
      rejected: false,
    };
  }
  return selector;
};
