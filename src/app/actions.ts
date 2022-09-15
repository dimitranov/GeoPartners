import { createAction } from "@reduxjs/toolkit";

export const createApiAction = <Request = void, Success = void, Error = void>(loadingKey: string) => ({
    LOADING_KEY: loadingKey,
    REQUEST: createAction<Request>(`${loadingKey}_API_REQUEST`),
    SUCCESS: createAction<Success>(`${loadingKey}_API_SUCCESS`),
    ERROR: createAction<Error>(`${loadingKey}_API_ERROR`),
});