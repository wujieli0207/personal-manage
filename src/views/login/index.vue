<template>
  <div class="flex items-center justify-center w-screen h-screen login-page">
    <div class="flex flex-col items-center p-10 rounded-lg bg-white/20">
      <h2 class="pb-4 text-2xl text-white">{{ title }}</h2>
      <el-form ref="formRef" :model="loginInfo" :rules="getFormRules">
        <el-form-item prop="userName">
          <el-input v-model="loginInfo.userName" class="w-60" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginInfo.password"
            class="w-60"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>

      <el-button class="w-60" type="primary" :loading="loading" @click="handleLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import { useFormValid, useFormRules } from "./hooks/useLogin";
  import { useMessage } from "/@/hooks/web/useMessage";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();
  const { notification, createErrorAlert } = useMessage();

  const title = import.meta.env.VITE_GLOB_APP_TITLE;

  const formRef = ref();
  const loading = ref(false);

  const loginInfo = reactive({
    userName: "wujieli",
    password: "123456",
  });

  const { validForm } = useFormValid(formRef);
  const { getFormRules } = useFormRules();

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;

    try {
      loading.value = true;

      const userInfo = await userStore.login({
        userName: loginInfo.userName,
        password: loginInfo.password,
        mode: "none",
      });
      if (userInfo) {
        notification.success({
          title: "登录成功",
          message: `欢迎回来：${userInfo.realName}`,
          duration: 2 * 1000,
        });
      }
    } catch (error) {
      createErrorAlert({
        message: (error as unknown as Error).message || "网络异常，请检查您的网络连接是否正确",
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped lang="less">
  @import "/@/styles/color.less";
  @property --perA {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 75%;
  }
  @property --perB {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 99%;
  }
  @property --perC {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 15%;
  }
  @property --perD {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 16%;
  }
  @property --perE {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 86%;
  }
  @property --angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }
  .login-page {
    @keyframes move {
      100% {
        --perA: 85%;
        --perB: 49%;
        --perC: 45%;
        --perD: 39%;
        --perE: 70%;
        --angle: 360deg;
      }
    }
    background-image: radial-gradient(
        circle at var(--perE) 7%,
        rgb(40 40 40 / 0.04) 0%,
        rgb(40 40 40 / 0.04) 50%,
        rgb(200 200 200 / 0.04) 50%,
        rgb(200 200 200 / 0.04) 100%
      ),
      radial-gradient(
        circle at var(--perC) var(--perD),
        rgb(99 99 99 / 0.04) 0%,
        rgb(99 99 99 / 0.04) 50%,
        rgb(45 45 45 / 0.04) 50%,
        rgb(45 45 45 / 0.04) 100%
      ),
      radial-gradient(
        circle at var(--perA) var(--perB),
        rgb(243 243 243 / 0.04) 0%,
        rgb(243 243 243 / 0.04) 50%,
        rgb(37 37 37 / 0.04) 50%,
        rgb(37 37 37 / 0.04) 100%
      ),
      linear-gradient(var(--angle), #22deed, #8759d7);
    animation: move 30s infinite alternate linear;
  }
</style>
