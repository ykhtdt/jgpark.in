export type TableOfContent = TableOfContentItem & {
  children: TableOfContentItem[]
}

export interface TableOfContentItem {
  slug: string
  text: string
}

export interface TableOfContentLevel {
  topLevel: number
  subLevel?: number
}
