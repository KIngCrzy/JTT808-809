import { Login, Business, Generate, Send, Close } from '@/services/simulate';

const Model = {
    namespace: 'protocol',
    state: {
        message: undefined,
    },
    effects: {
        *login({ payload }, { call, put }) {

            const response = yield call(Login, payload);

            yield put({
                type: 'changeMessage',
                payload: response,
            });
            return response
        },
        *business({ payload }, { call, put }) {

            const response = yield call(Business, payload);

            yield put({
                type: 'changeMessage',
                payload: response,
            });
            return response
        },
        *generate({ payload }, { call, put }) {

            const response = yield call(Generate, payload);

            yield put({
                type: 'changeMessage',
                payload: response,
            });
            return response
        },

        *send({ payload }, { call, put }) {

            const response = yield call(Send, payload);
            return response

        },

        *close({ payload }, { call, put }) {

            const response = yield call(Close, payload);
            return response

        },

    },
    reducers: {
        changeMessage(state, { payload }) {
            return { ...state, message: payload };
        },
    },
};
export default Model;
