import * as echarts from "echarts/core";

import { LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";

import { SVGRenderer } from "echarts/renderers";

echarts.use([TooltipComponent, GridComponent, LineChart, SVGRenderer]);

export default echarts;
