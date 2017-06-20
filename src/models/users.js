import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const data = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.data,
          total: data.total,
          page: parseInt(page, 10),
        },
      });
    },
    *update({ payload: { id, values } }, { call, put }) {
      yield call(usersService.update, id, values);
      yield put({ type: 'reload' });
    },
    *modifyPassword({ payload: { id, password } }, { call }) {
      yield call(usersService.modifyPassword, id, password);
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
