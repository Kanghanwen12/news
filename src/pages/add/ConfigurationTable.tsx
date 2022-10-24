import {Form, Input, Button, Space, Select, Cascader, InputNumber, PageHeader, message} from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React from "react";
import styles from "../HelloWorld.module.css";


const formItemLayout = {
  labelCol: {span: 25},
  wrapperCol: {span: 25},
};

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
const limitDecimals = (value: any) => {
  return value.replace(/^(0+)|[^\d]+/g, '');
};
const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const select = [{name: '天', value: '1'},{name: '月', value: '2'}]

const initRules = [{required: true, message: '字段必填！'}]

interface FormItemProps {
  type: string,
  name: string;
  label: string;
  initValue: string;
  rules: {}[]
}

// 商品数据添加循环控制
const initValues = [
  {type:'Cascader',name:'goods',label:'商品类目',},
  {type:'InputNumber',name:'time1',label:'保质期', min: 0},
  {type:'Select',name:'day1',label:''},
  {type:'InputNumber',name:'time2',label:'',},
  {type:'Select',name:'day2',label:''},
]


interface TypeProps {
  initValues: FormItemProps[],
}

const FormList = (props: TypeProps) => {
  const [form] = Form.useForm();

  const onChange = (value: string[][]) => {
    console.log(value);
  };

  const switchData = (field: any, item: any, index: any, fields: any) => {
    switch (item.type) {
      case 'Cascader':

        return (
          <Form.Item
          { ...field }
          label={ item.label }
          { ...formItemLayout }
          name={ [field.name, item.name] }
          // @ts-ignore
          fieldKey={ [field.fieldKey, item.name] }
          rules={ item.rules || initRules }
          initialValue={ item.initValue }
          key={index}
        >
          <Cascader
            options={options}
            placeholder="选择商品类目"
            // @ts-ignore
            onChange={onChange}
            // multiple
            maxTagCount="responsive"

          />
        </Form.Item>
        )
      case 'InputNumber':
        return (
          <Form.Item
            { ...field }
            key={index}
            label={ item.label }
            { ...formItemLayout }
            name={ [field.name, item.name] }
            // @ts-ignore
            fieldKey={ [field.fieldKey, item.name] }
            rules={ item.rules || initRules }
            initialValue={ item.initValue }

          >
            <InputNumber
              min={item.min}
              max = {item.max}
              disabled={item.disabled}
              formatter={limitDecimals}
              onChange={(names: any)=>{

                const data1  = form.getFieldsValue().sights.map((i: any, keys: number) =>{
                  if(keys === field.key){
                    if(item.name === 'time2') {
                      if(i.time2 && i.time1) {
                        if (names <= i.time1) {
                           i.time2 = ''
                          // return false
                        }
                      }
                    }
                    if(item.name === 'time1') {
                      if (i.time2 && i.time1) {
                        if (names >= i.time2) {
                           i.time1 = ''
                        }
                      }
                    }
                  }
                  return i
                })
                // console.log(data1,'data1')
                form.setFieldsValue({sights: data1});

              }}
            />
          </Form.Item>
          )
        break;
      case 'Select':
        return (
          <Form.Item
            { ...field }
            {...formItemLayout}
            label={ item.label }
            name={ [field.name, item.name] }
            // @ts-ignore
            fieldKey={ [field.fieldKey, item.name] }
            rules={ item.rules || initRules }
            initialValue={ item.initValue }
            key={index}
          >
            <Select placeholder="请选择"
                    value={select[0].value}
                    onChange={(newValue)=>{
                      console.log(form.getFieldsValue().sights, field.key)
                      const data1  = form.getFieldsValue().sights.map((i: any, keys: number) =>{
                        if(keys === field.key){
                          i.day2 = newValue;
                          i.day1 = newValue
                        }
                        return i
                      })
                      form.setFieldsValue({sights: data1});
                    }
                    }
            >
              {
                select.map(c => (
                  <Select.Option
                    value={c.value}
                    key={c.value}
                  >
                    {c.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
        )
        break;
      default :
        break;
    }
  }

  const onFinish = (values: any) => {
    const submitData = {
      day1:values.day1,
      day2:values.day2,
      time1: values.time1,
      time2: values.time2,
      Cascader: values.goods,
    }
    console.log(submitData, '数据')
    message.success('数据提交成功！');
  };
  return (
    <div>
      <PageHeader
        onBack={() => {
          // @ts-ignore
          window.history.back(-1)
        }
        }
        title="类目保质配置"
        // subTitle="hi ~"
      />
      <div  className={styles.from}>
    <Form form={ form } name="dynamic_form_nest_item" onFinish={ onFinish } autoComplete="off"
          initialValues={{
            sights:[{name: 0, key: 0, isListField: true, fieldKey: 0}] // 默认有一行
          }}>
      <Form.List name="sights" >
        { (fields, {add, remove}) => {
          return (
          <>
            { fields.map(field => {
              // @ts-ignore
                field.initValues = initValues
              // @ts-ignore
                return (
              <Space key={ field.key } align="baseline" style={{width:'100%'}}>
                {/**@ts-ignore*/}
                {field.initValues.map( (item, index) => {
                  return switchData(field, item, index, fields)
                })}
                {fields && fields.length > 1 &&<MinusCircleOutlined
                  onClick={ () => remove(field.name) }
                  style={{color: '#4090f7' }}
                />}
              </Space>
            )}
            ) }

            {fields && fields.length < 5 && <Form.Item className={styles.adds}>
              <PlusCircleOutlined  onClick={ () => add() } className={styles.icons1}/>
            </Form.Item>}
          </>
        )} }
      </Form.List>
      <Form.Item style={{marginLeft:200}}>
        <Button onClick={()=>{
          // @ts-ignore
          window.history.back(-1)
        }}>
          返回
        </Button>
        <Button type="primary" htmlType="submit" style={{marginLeft:40}}>
          保存
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
}

export default FormList
