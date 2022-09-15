import { all } from '@redux-saga/core/effects'

import partnersSaga from '../features/partners/saga'

export default function* sagas() {
    yield all([
        partnersSaga(),
    ]);
}