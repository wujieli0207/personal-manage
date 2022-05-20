<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { prefixCls as defaultPrefixCls } from "/@/settings/designSetting";
import { createAppProviderContext } from "/@/components/Application/src/useAppContext";

const props = defineProps({
  prefixCls: {
    type: String,
    default: defaultPrefixCls,
  },
});

const { prefixCls } = toRefs(props);
const isMobile = ref(false);

// 注入全局变量
createAppProviderContext({ prefixCls, isMobile });
</script>
