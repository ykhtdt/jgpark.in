export interface StorageFile {
  id: string | null
  name: string
  bucket_id?: string
  owner?: string | null
  created_at?: string
  updated_at?: string
  last_accessed_at?: string
  metadata?: Record<string, any>
}
