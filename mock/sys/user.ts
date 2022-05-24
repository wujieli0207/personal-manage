import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError, getRequestToken, requestParams } from "../_util";
import { LoginParams } from "/@/api/model/userModel";

interface PermissionList {
  userId: string | number;
  permision: string[] | number[];
}

export function createFakeUserList() {
  return [
    {
      userId: "1",
      userName: "wujieli",
      realName: "wujieli",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      homePath: "/weekReportView",
      roles: [
        {
          roleName: "Super Admin",
          value: "super",
        },
      ],
    },
  ];
}

const fakePermisionList: PermissionList[] = [
  {
    userId: "1",
    permision: ["1000", "3000", "5000"],
  },
  {
    userId: "2",
    permision: ["2000", "4000", "6000"],
  },
];

export default [
  {
    url: "/api/login",
    timeout: 200,
    method: "post",
    response: ({ body }: { body: LoginParams }) => {
      const { userName, password } = body;
      const checkUser = createFakeUserList().find((item) => {
        return item.userName === userName && item.password === password;
      });
      if (!checkUser) {
        return resultError("账号或密码不正确");
      }

      const { userId, userName: _userName, token, realName, desc, roles } = checkUser;

      return resultSuccess({
        userId,
        userName: _userName,
        token,
        realName,
        desc,
        roles,
      });
    },
  },
  {
    url: "/api/getUserInfo",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError("Token 不存在");
      }

      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("人员信息不存在");
      }

      return resultSuccess(checkUser);
    },
  },
  {
    url: "/api/getPermCode",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError("Token 不存在");
      }

      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("人员信息不存在");
      }

      const codeList = fakePermisionList.find((item) => {
        if (item.userId === checkUser.userId) {
          return item.permision;
        }
      });

      return resultSuccess(codeList);
    },
  },
  {
    url: "/api/logout",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError("Token 不存在");
      }

      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("人员信息不存在");
      }

      return resultSuccess(undefined, { message: "Token 已被销毁" });
    },
  },
] as MockMethod[];
