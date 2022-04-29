import { Experience, ExperienceOptions } from '@/index'
import icon from '@/icons/demdex.jpg'
import { genericViewers as defaultView } from '@/pipelines/generic'

const options: ExperienceOptions = {
  defaultView,
  hideSummary: false,
  hideFileExplorer: false,
  icon: icon,
  slug: 'demdex',
  title: 'Demdex'
}

export default new Experience(options)