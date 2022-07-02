import { PropType } from "vue";
import { FormSchema } from "./src/types/form";

export const basicProps = {
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
};
