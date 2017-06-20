import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';
import UserPasswordModal from './UserPasswordModal';


function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/update',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  function modifyPasswordHandler(id, values) {
    dispatch({
      type: 'users/modifyPassword',
      payload: { id, password: values.password },
    });
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => {
        return roles.map((role) => {
          return role.name;
        }).join(',');
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </UserModal>
          <span className="ant-divider" />
          <UserPasswordModal
            user_id={record.id}
            onOk={modifyPasswordHandler.bind(null, record.id)}
          >
            <a>修改密码</a>
          </UserPasswordModal>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{ roles: [] }} onOk={createHandler}>
            <Button type="primary">新建用户</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
