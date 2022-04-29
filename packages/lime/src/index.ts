import { Experience, ExperienceOptions } from '@/index'
import icon from '@/icons/lime.jpg'
import { genericViewers as viewBlocks } from '@/pipelines/generic'

const options: ExperienceOptions = {
  hideSummary: false,
  hideFileExplorer: false,
  icon: icon,
  slug: 'lime',
  title: 'Lime',
  viewBlocks
}

export default new Experience(options)
