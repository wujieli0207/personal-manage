import { computed, Ref, ref, unref } from "vue";
import { LoginTypeEnum } from "/@/enums/appEnum";
import { FormRules } from "element-plus";

const currentLoginType = ref(LoginTypeEnum.LOGIN);

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: "change",
    },
  ];
}

/**
 *
 * @description 登陆表单校验
 */
export function useFormValid<T extends Object>(formRef: Ref<unknown>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;

    const data = await (form as any).validate();

    return data as T;
  }

  return { validForm };
}

/**
 *
 * @description 登陆表单规则
 */
export function useFormRules(_loginInfo?: Recordable) {
  const getAccountFormRule = computed(() => {
    return createRule("请输入账号");
  });
  const getPasswordFormRule = computed(() => {
    return createRule("请输入密码");
  });

  const getFormRules = computed((): FormRules => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);

    switch (unref(currentLoginType)) {
      // 默认普通登陆校验规则
      default:
        return {
          userName: accountFormRule,
          password: passwordFormRule,
        };
    }
  });

  return { getFormRules };
}
