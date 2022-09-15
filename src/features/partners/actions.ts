import { createApiAction } from "../../app/actions";
import { Partner } from "./types";

const actionPrefix = 'PARTNERS';

export const getPartnersAction = createApiAction<void, Partner[], void>(`${actionPrefix}/GET_ALL`);