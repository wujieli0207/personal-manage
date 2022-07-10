import { computed, ComputedRef, ref, unref, watch } from "vue";
import { BasicTableProps } from "../types/table";

export function useDataSource(propsRef: ComputedRef<BasicTableProps>) {
  const dataSourceRef = ref<Recordable[]>([]);

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef);
      !api && dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    }
  );

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);

    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }

    return unref(dataSourceRef);
  });

  return { getDataSourceRef };
}
