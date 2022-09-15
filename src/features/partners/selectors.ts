import { createSelector } from "reselect";
import { RootState } from "../../app/store";


const selectLocal = (store: RootState) => store.partners;

export const makePartnersSelector = createSelector(selectLocal, localState => localState.partners)