import { message } from 'antd';
import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    q: '',
  },
  reducers: {
    save(state, { payload: { data: list, total, page, q } }) {
      return { ...state, list, total, page, q };
    },
  },
  effects: {
    *fetch({ payload: { page = 1, q = '' } }, { call, put }) {
      const data = yield call(usersService.fetch, { page, q });
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
      const ret = yield call(usersService.update, id, values);

      if (ret.error_code !== 0) {
        message.error(ret.msg, 2);
      } else {
        message.success('更新用户成功', 2);
      }

      yield put({ type: 'reload' });
    },
    *modifyPassword({ payload: { id, password } }, { call }) {
      const ret = yield call(usersService.modifyPassword, id, password);

      if (ret.error_code !== 0) {
        message.error(ret.msg, 2);
      } else {
        message.success('修改密码成功', 2);
      }
    },
    *create({ payload: values }, { call, put }) {
      const ret = yield call(usersService.create, values);

      if (ret.error_code !== 0) {
        message.error(ret.msg, 2);
      } else {
        message.success('新建用户成功', 2);
      }

      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      const q = yield select(state => state.users.q);
      yield put({ type: 'fetch', payload: { page, q } });
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
