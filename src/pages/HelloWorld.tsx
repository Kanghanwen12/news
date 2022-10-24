import React, { useEffect, useState } from 'react';
// @ts-ignore
import { HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { PageHeader, Table, Space, Tag, Form, Select, Input, Button, Popover } from 'antd';
import axios from "axios";
import "../mock/list";
import styles from "./HelloWorld.module.css";



const tagName = {
  '1': '审核中',
  '2': '被通过',
  '3': '被驳回'
}

const select = [
  {name: '全部', value: 1},
  {name: '管理员', value: 2},
  {name: 'admin', value: 3}
]
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const descData = (record: any, key: string) =>{
  console.log(record)
}
// 列表内容
// @ts-ignore
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "京东pin",
    dataIndex: "jdName",
    key: "id",
  },
  {
    title: "姓名",
    dataIndex: "nickName",
    key: "id",
  },
  {
    title: "手机号",
    dataIndex: "mobile",
    key: "id",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "id",
  },
  {
    title: "审核状态",
    dataIndex: "auditStatus",
    key: "id",
    render: ( key: string, record: any) => (
      <>
        <Tag color="blue" key={key}>
          {tagName[key as keyof typeof tagName] }
        </Tag>
        <Popover content={record.auditStatusDesc} title="说明" arrowPointAtCenter>
          {key === '3' && <p onClick={()=> {descData(record, key)}} className={styles.descClass}>驳回说明</p>}
        </Popover>
      </>
    ),
  },
  {
    title: "操作人",
    dataIndex: "createdUser",
    key: "id",
  },
  {
    title: "创建时间",
    dataIndex: "createdDate",
    key: "id",
  },
  {
    title: "操作",
    dataIndex: "address",
    width: "30%",
    key: "address",
    render: (_:any, record: any) => (
      <Space size="middle">
        <a onClick={() => adit(record)}>查看</a>
        <a onClick={() => adit(record)}>角色权限</a>
        <a onClick={() => del(record)}>编辑</a>
        <a onClick={() => del(record)}>删除</a>
      </Space>
    ),
  },
];

const del = (record: any) => {
};
const adit = (item: any) => {
};

const List =  (props: any) => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]); // 列表数据
  const [loading, setLoading] = useState(false); // loading弹框

  useEffect(() => {
    // 列表
    setLoading(true);
    axios.post('/sys/account/sub/list', {
      // data:{
      //   aa:11
      // }
    }).then(res => {
      const data = res.data?.data?.dataList || []
      setDataSource(data)
      setLoading(false);
    })
  }, [])

  // 提交
  const onFinish = (values: any) => {
    console.log('Success:', values);
    setLoading(true);
    axios.post('/sys/account/sub/list', {
      ...values
    }).then(res => {
      const data = res.data?.data?.dataList || []
      setDataSource(data)
      setLoading(false);
    })
  };

  // 重置
  const onReset = () => {
    form.resetFields();
  };
  // @ts-ignore
  return (
    <div className={styles.hw}>
      <PageHeader
        onBack={() => {
          // @ts-ignore
          window.history.back(-1)
        }
        }
        title="人员管理-列表"
        // subTitle="hi ~"
      />
      <Form
        {...formItemLayout}
        form={form}
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="jdName"
          label="京东pin"
        >
          <Input
            placeholder="请输入京东pin"
          />
        </Form.Item>
        <Form.Item
          name="nickName"
          label="个人信息"
        >
          <Input
            placeholder="请输入姓名/手机号"
          />
        </Form.Item>
        <Form.Item
          name="role"
          label="角色"
          // @ts-ignore
          // value={select[0].value}
        >
          <Select placeholder="请选择"
                  value={select[0].value}
                  // defaultValue={select[0].value}
          >
            {
              select.map(c => (
                <Select.Option value={c.value} key={c.value}
                >
                  {c.name}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" danger>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={onReset}>重置</Button>
        </Form.Item>
      </Form>
      <div className={styles.btn}>
          <Link
            to={{
              pathname: '/Add',
            }}
          >
            <Button type="primary" danger>新增人员</Button>
          </Link>

        <Button type="link">
          下载授权书模板
        </Button>
      </div>
        <Table
          columns={columns}
          className={styles.content}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            showQuickJumper: true,
            total:1000,
            defaultPageSize: 5,
            pageSizeOptions:[5,10,20,50]
          }}
          rowKey={record=> record.id}
        />
      <Link
        to={{
          pathname: '/ConfigurationTable',
        }}
      >
        <Button type="primary" danger>类目保质期配置</Button>
      </Link>
    </div>
  )

};

export default List;
