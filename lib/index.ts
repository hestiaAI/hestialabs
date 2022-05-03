import type { ViewBlock } from 'types/view-block'
import type { PipelineOutput } from 'types/utils'

// https://javascript.plainenglish.io/leveraging-type-only-imports-and-exports-with-typescript-3-8-5c1be8bd17fb
import type { ExperienceOptions } from 'types/index'
export type { ExperienceOptions } from 'types/index'

import { error } from '@/utils'
import {
  validateDatabaseConfigIntegrity
  // validateDatabaseConfigSchema
} from './database-config-validation/index'

const defaultViewBlock: Partial<ViewBlock> = {
  postprocessor: (input: PipelineOutput) => input,
  showTable: false
}

export function createViewBlock(viewBlock: ViewBlock) {
  // merge with default options
  return {
    ...defaultViewBlock,
    ...viewBlock
  }
}

const defaultOptions: Partial<ExperienceOptions> = {
  disabled: false,
  hideFileExplorer: true,
  hideSummary: true,
  keepOnlyFiles: true,
  subtitle: 'Data Experience'
}

export class Experience {
  options: ExperienceOptions
  constructor(options: ExperienceOptions) {
    // spread default options first, and then provided options
    this.options = { ...defaultOptions, ...options }
    const { slug, files, viewBlocks, disabled, url, databaseConfig } =
      this.options

    if (!disabled && !url && !viewBlocks.length) {
      error(`[${slug}] viewBlocks should not be empty`)
    }
    if (files) {
      // validate file ids
      viewBlocks.forEach(({ id, files: viewFiles }) => {
        if (viewFiles) {
          const fileId = viewFiles.find((f: string) => !(f in files))
          if (fileId) {
            error(
              `[${slug}] ViewBlock ${id} has an unconfigured file id ${fileId}`
            )
          }
        }
      })
      if (databaseConfig) {
        // validateDatabaseConfigSchema(slug, databaseConfig)
        validateDatabaseConfigIntegrity(slug, databaseConfig, files)
      }
    }
    // construct default view Array
    this.options.viewBlocks = options.viewBlocks.map(createViewBlock)
  }
}
