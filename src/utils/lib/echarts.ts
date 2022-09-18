import * as echarts from 'echarts/core'

import { LineChart, BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, GridComponent, LineChart, BarChart, SVGRenderer])

export default echarts
