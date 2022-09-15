import { takeLatest, call, put } from 'redux-saga/effects';
import { appFetch, ReqType } from '../../services/appFetch';

import { getPartnersAction } from "./actions";
import { Partner } from './types';

export function* handleGetPartnersWorker() {
    try {
        const response: {data: Partner[]} = yield call(appFetch, ReqType.GET, 'data/partners.txt');
        yield put(getPartnersAction.SUCCESS(response.data));
    } catch(err) {
        yield put(getPartnersAction.ERROR());
    }
}

export default function* watchPartnersGen() {
    yield takeLatest(getPartnersAction.REQUEST.type, handleGetPartnersWorker)
}