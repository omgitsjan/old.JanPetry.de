import type { ParsedContent as DefaultParsedContent } from '@nuxt/content/dist/runtime/types'
import type { StorageMeta } from 'unstorage'

export interface ParsedContent extends DefaultParsedContent {
  storageMeta: StorageMeta
  prose?: boolean
  schemaOrg: Record<string, any>
}

export interface Post extends ParsedContent {
  readingMins: number
  description: string
  publishedAt: Date
  modifiedAt: Date
  path: string
  renderer: 'post' | 'page'
  icon?: string
  nav?: boolean
  status?: 'sponsors-only' | 'unlisted' | 'published'
}
export interface Page extends Post {
}

export interface JsonParsedContent<T> extends ParsedContent {
  body: T
}

export interface Project {
  name: string
  description: string
  repo: string
  updatedAt: string
  stars: number
  icon?: string
}

export interface ProjectList extends ParsedContent {
  name: string
  projects: Project[]
}

export interface GeneralList extends ParsedContent {
  name: string
  entrys: Entry[]
}

export interface Entry {
  name: string
  description: string
  icon?: string
  link?: string
  since?: string
}