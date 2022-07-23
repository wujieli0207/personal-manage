import { FixedDir } from "element-plus/es/components/table-v2/src/constants";
import { BasicColumn } from "/@/components/Table/src/types/columns";

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      label: "ID",
      prop: "id",
      fixed: FixedDir.LEFT,
      width: 200,
    },
    {
      label: "姓名",
      prop: "name",
      width: 150,
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
    },
    {
      label: "地址",
      prop: "address",
      width: 150,
    },
    {
      label: "编号",
      prop: "no",
      width: 150,
      sorter: true,
      defaultHidden: true,
      helpMessage: "姓名提示文字示例",
    },
    {
      label: "开始时间",
      width: 150,
      sorter: true,
      prop: "beginTime",
      helpMessage: ["开始时间提示文字示例", "开始时间提示换行"],
    },
    {
      label: "结束时间",
      width: 150,
      sorter: true,
      prop: "endTime",
    },
  ];
}

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: "John Brown",
        age: `1${index}`,
        no: `${index + 10}`,
        address: "New York No. 1 Lake ParkNew York No. 1 Lake Park",
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
}

export function getEditTableColumn(): BasicColumn[] {
  return [
    {
      label: "ID",
      prop: "id",
      fixed: FixedDir.LEFT,
    },
    {
      label: "姓名",
      prop: "name",
      width: 150,
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
    },
    {
      label: "地址",
      prop: "address",
    },
    {
      label: "操作",
      prop: "action",
      align: "center",
      slots: {
        body: "action",
      },
    },
  ];
}
