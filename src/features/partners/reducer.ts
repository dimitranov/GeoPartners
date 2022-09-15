import { createReducer } from "@reduxjs/toolkit";
import { getPartnersAction } from "./actions";
import { Partner } from "./types";

export interface PartnersReducerState {
    partners: Partner[]
}

export const initialState: PartnersReducerState = {
    partners: []
}

export const partnersReducer = createReducer(initialState, builder => {
    builder
        .addCase(getPartnersAction.SUCCESS, (state, action) => {
            state.partners = action.payload;
        })
})