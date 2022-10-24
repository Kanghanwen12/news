import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Checkbox, Col, Form, Input, Select,DatePicker, Radio, Upload, message, Switch,} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// @ts-ignore
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';

import styles from "../HelloWorld.module.css";


const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const select = [{label: '测试门店', value: '1'},{label: '测试商家', value: '2'}]
const radioData = [{label: '满减', value: 1}, {label: '极速达', value: 2}, {label: '新人首单免运费', value: 3}]
const CheckboxData = [{label: '到家', value: 1}, {label: '海博', value: 2}]

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 2 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 2 },
    sm: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface RcFile {
  type: boolean;
  file:any,
  size: number,
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  // @ts-ignore
  reader.readAsDataURL(img);
};


const AddList: React.FC = () => {
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false); // loading弹框
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [account, setAccount] = useState<number>(0);

  // 上传图片  /*
  // 没有接口，现阶段只获取默认的参数
  //
  // */
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      setLoading(true);
      getBase64(info.file.originFileObj as unknown as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as unknown as RcFile, url => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );



  // 提交
  const onFinish = (values: any) => {
    const submitData = {
      ...values,
      activeStartTime: moment(values.activeStartTime[0]).format("YYYY-MM-DD HH:mm:ss"),
      activeEndTime: moment(values.activeStartTime[1]).format("YYYY-MM-DD HH:mm:ss"),
      businessLicense: values.businessLicense[0].name,
      account: values.account ? 1 : 0,
    }
    console.log('数据:', submitData);
    message.success('数据提交成功！');



  };

  // 重置
  const onReset = () => {
    setImageUrl('')
    form.resetFields();
  };

  // 活动日期大于当前日期
  const handleData = (time: any) => {
    return time < moment().subtract(1, "days")
  }
  return (
    <div>
      <PageHeader
        onBack={() =>
          // @ts-ignore
          window.history.back(-1)}
        title="活动表单"
        // subTitle="hi ~"
      ></PageHeader>
      <div className={styles.main}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="activeName"
            label="活动名称"
            rules={[
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (value && value.length > 20) {
                    return Promise.reject(new Error('促销名称最多不能超过20个字'));
                  }
                  return Promise.resolve();
                },
              }),
              {
                required: true, message: '促销名称不能为空!',
                whitespace: true
              }
            ]}
          >
            <Input placeholder="促销名称不能超过20个字" />
          </Form.Item>
          <Form.Item
            name="storeList"
            label="门店范围"
            rules={[{required: true, message: '门店范围不能为空!'}]}
          >
            <Select placeholder="请选择门店范围"
                    allowClear
                    mode="tags"
                    showArrow={true}
                    style={{width: 300}}
            >
              {
                select.map(c => (
                  <Select.Option value={c.value} key={c.value}
                  >
                    {c.label}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="activeStartTime"
            label="活动时段"
            rules={[{required: true, message: '活动时段不能为空!'}]}
          >
            <RangePicker disabledDate={handleData}
                         format="YYYY-MM-DD HH:mm:ss"
                         showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="用户手机号"
            rules={[
              ({getFieldValue}) => ({
                validator(_, value) {
                  if(value) {
                    if (/\d{11}/.test(value)) {//if中是正则表达是,判断是否11位数字
                      return Promise.resolve();
                    } else {
                      return Promise.reject("请输入有效手机号");// 如果违反规则，就会给出提示
                    }
                  }else {
                    return Promise.resolve();
                  }
                },
              }),
              {required: true, message: '用户手机号不能为空!'},
            ]}
          >
            <Input
              style={{width: 300}}
              placeholder="请输入"
              maxLength={11}
            />
          </Form.Item>
          <Form.Item
            name="freightType" label="运费类型"
            rules={[{required: true, message: '运费类型不能为空!'}]}
          >
            <Radio.Group options={radioData} />
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="businessLicense" label="营业执照"
            rules={[{required: true, message: '营业执照不能为空!'}]}
          >
            <Upload
              name="avatar"
              accept=".jpg, .png"
              maxCount={1}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
              /*@ts-ignore*/
              extra="请上传门店营业执照,支持JPG、PNG个事"
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="distributionChannels" label="销售渠道"
            rules={[{required: true, message: '请选择销售渠道!'}]}
          >
            <CheckboxGroup options={CheckboxData} />
          </Form.Item>
          <Form.Item
            name="account"
            label="设为默认账号"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={account === 1}
            />
          </Form.Item>


          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" danger>
              确定
            </Button>
            <Button onClick={onReset} className={styles.btns}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )

};

export default AddList;
