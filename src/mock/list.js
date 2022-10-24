import Mock from "mockjs";
Mock.setup({ timeout: '200-1000' });
Mock.mock('/sys/account/sub/list',{
  "msg": "",
  "code": 0,
  "data": {
    "totalPage": "",
    "dataList|1000": [
      {    //生成|num个如下格式名字的数据
        "id|+1":1,  //数字从当前数开始后续依次加一
        'account': '转户',
        'mobile|+4': '13912340000',
        "nickName":"@cname",    //名字为随机中文名字
        'createdUser': '@name',
        'createdDate': "@datetime('yyyy/MM/dd HH:mm:ss')",
        "authorFile": '不知道',
        "jdName": "@name",
        "auditStatus|1": [
          "2",
          "3"
        ],
        "role|1":[
          "管理者",
          "运维人员",
          "admin"
        ],
        "auditStatusDesc": '状态说明：驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因',
        "auditRemark": '秒杀',
        "shopGuidePhoto": "照片",
      }
    ],
    "totalCount": "",
    "pageNum": ""
  }

})
