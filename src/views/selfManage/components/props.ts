import { PropType } from "vue";

export interface BasicProps {
  width: string;
  height: string;
}

export const basicProps = {
  width: {
    type: String as PropType<string>,
    default: "100%",
  },
  height: {
    type: String as PropType<string>,
    default: "280px",
  },
  xData: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
  yData: {
    type: Array as PropType<Array<number>>,
    default: () => [],
  },
};
