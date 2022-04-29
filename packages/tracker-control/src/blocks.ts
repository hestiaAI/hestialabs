import type { ViewBlocks } from '@/types/view-block'
import { customPipelineMergeCSV } from '@/pipelines/custom'

const blocks: ViewBlocks = [
  {
    key: 'trackerControl',
    customPipeline: customPipelineMergeCSV('tracker-control'),
    files: ['tracker-control'],
    visualization: 'ChartViewTrackerControl.vue',
    showTable: false,
    title: 'Overview',
    text: 'Monitor below all the tracking done on your smartphone applications. You can filter the results by selecting a time range or clicking on each graph.'
  }
]

export default blocks