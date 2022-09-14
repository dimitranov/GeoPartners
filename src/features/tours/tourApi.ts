import { appFetch, ReqType } from "../../services/appFetch";
import { API_TOURS } from "../../services/urlHelper";

export const fetchAllTours = async () => {
  return appFetch(ReqType.GET, API_TOURS, false, false);
};
