import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';


const FormItem = Form.Item;


class UserPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModalHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModalHandler();
      }
    });
  };

  render() {
    let confirmDirty = false;
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const handleConfirmBlur = (e) => {
      const value = e.target.value;
      confirmDirty = confirmDirty || !!value;
    };

    const checkPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一致');
      } else {
        callback();
      }
    };

    const checkConfirm = (rule, value, callback) => {
      const form = this.props.form;
      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码',
                }, {
                  validator: checkConfirm,
                }],
              })(
                <Input type="password" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请再次输入密码',
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input type="password" onBlur={handleConfirmBlur} />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserPasswordModal);
