import packageJSON from '../package.json'
import { Experience, ExperienceOptions } from '@/index'
import icon from '@/icons/apple.png'
import { genericViewers as viewBlocks } from '@/pipelines/generic'

const options: ExperienceOptions = {
  disabled: true,
  hideSummary: false,
  hideFileExplorer: false,
  icon: icon,
  title: 'Apple',
  viewBlocks
}

export default new Experience(options, packageJSON, import.meta.url)
