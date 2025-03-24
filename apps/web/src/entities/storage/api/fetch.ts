import type { StorageFile } from "../model/types"

import { supabase } from "@/shared/api"
import { getImageUrl } from "./url"

export interface ImagePaginationOptions {
  /* 한 페이지에 가져올 이미지 수 (기본값: 20) */
  limit?: number
  /* 건너뛸 이미지 수 (기본값: 0) */
  offset?: number
  /* 정렬 기준 컬럼 (기본값: created_at) */
  sortBy?: string
  /* 정렬 방향 (기본값: desc) */
  sortOrder?: "asc" | "desc"
}

export interface ImagePaginationResult {
  /* 이미지 파일 목록 (with url) */
  files: (StorageFile & { url: string })[] | null
  /* 전체 이미지 수 */
  totalCount: number
}

/**
 * RPC에서 반환하는 이미지 항목의 타입 정의
 */
interface StorageImageItem {
  id: string
  name: string
  bucket_id: string
  owner: string | null
  created_at: string
  updated_at: string
  metadata: Record<string, any> | null
}

/**
 * Supabase RPC를 사용해 총 이미지 파일 개수를 조회
 *
 * @param bucketName - 버킷 이름
 * @param folderPath - 폴더 경로
 * @returns 이미지 파일의 총 개수
 */
export const fetchTotalImageCount = async (
  bucketName: string,
  folderPath: string
): Promise<number> => {
  try {
    const normalizedPath = getNormalizedPath(folderPath)

    // Supabase RPC를 이용하여 이미지 파일 총 개수 조회
    const { data, error } = await supabase.rpc("get_files_count", {
      bucketname: bucketName,
      folderpath: normalizedPath
    })

    if (error) {
      console.error("Error fetching total image count:", error)
      return 0
    }

    return data || 0
  } catch (error) {
    console.error("Unexpected error fetching total image count:", error)
    return 0
  }
}

/**
 * Supabase DB의 objects 테이블에서 현재 페이지에 해당하는 이미지 파일 목록을 가져온다.
 *
 * @param bucketName - 버킷 이름
 * @param folderPath - 폴더 경로
 * @param options - 페이지네이션 옵션
 * @returns 현재 페이지의 이미지 파일 목록
 */
const fetchImagesFromDatabase = async (
  bucketName: string,
  folderPath: string,
  options: Required<ImagePaginationOptions>
): Promise<StorageFile[] | null> => {
  const { limit, offset, sortBy, sortOrder } = options
  const normalizedPath = getNormalizedPath(folderPath)

  try {
    const { data, error } = await supabase.rpc("get_files_from_storage", {
      bucketname: bucketName,
      folderpath: normalizedPath,
      limit_val: limit,
      offset_val: offset,
      sortby: sortBy,
      sortorder: sortOrder
    })

    if (error) {
      console.error("Error fetching images from database:", error)
      return null
    }

    if (!data || data.length === 0) {
      return []
    }

    const filesResult: StorageFile[] = data.map((item: StorageImageItem) => {
      const fileName = extractFilename(item.name)
      return {
        id: item.id || null,
        name: fileName,
        bucket_id: item.bucket_id,
        owner: item.owner,
        created_at: item.created_at,
        updated_at: item.updated_at,
        metadata: item.metadata || {}
      }
    })

    return filesResult
  } catch (error) {
    console.error("Error in fetchImagesFromDatabase:", error)
    return null
  }
}

/**
 * 전체 경로에서 파일명만 추출하는 함수
 * 예: "folder/subfolder/image.jpg" -> "image.jpg"
 *
 * 파일 경로가 유효하지 않은 경우 기본 파일명("unknown.jpg")을 반환하여
 * 후속 처리 과정에서 오류 발생을 방지하고 UI 일관성을 유지합니다.
 *
 * @param fullPath - 전체 파일 경로
 * @returns 파일명 또는 기본값
 */
const extractFilename = (fullPath: string): string => {
  if (!fullPath) {
    return "unknown.jpg"
  }

  const parts = fullPath.split("/")

  return parts[parts.length - 1] || "unknown.jpg"
}

/**
 * 페이지네이션을 적용하여 이미지를 가져오는 함수
 *
 * @param bucketName - 버킷 이름
 * @param folderPath - 폴더 경로
 * @param options - 페이지네이션 옵션
 *
 * @returns 이미지 파일 목록과 총 개수
 */
export const fetchImagesWithPagination = async (
  bucketName: string,
  folderPath: string = "",
  options: ImagePaginationOptions = {}
): Promise<ImagePaginationResult> => {
  try {
    const paginationOptions: Required<ImagePaginationOptions> = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || "created_at",
      sortOrder: options.sortOrder || "desc"
    }

    // DB에서 이미지 파일 가져오기
    const files = await fetchImagesFromDatabase(bucketName, folderPath, paginationOptions)

    if (!files) {
      return { files: null, totalCount: 0 }
    }

    // 이미지에 URL 추가
    const filesWithUrls = addUrlsToFiles(files, bucketName, folderPath)

    // 총 이미지 개수 조회
    const totalCount = await fetchTotalImageCount(bucketName, folderPath)

    return {
      files: filesWithUrls,
      totalCount
    }
  } catch (error) {
    console.error("Unexpected error fetching images:", error)
    return { files: null, totalCount: 0 }
  }
}

/**
 * 모든 경로가 슬래시('/')로 끝나도록 보장한다.
 * 예시:
 * - "folder" -> "folder/"
 * - "folder/" -> "folder/"
 * - "" -> ""
 *
 * @param folderPath - 폴더 경로
 * @returns 정규화된 폴더 경로
 */
const getNormalizedPath = (folderPath: string): string => {
  const hasPath = folderPath.length > 0
  const endsWithSlash = folderPath.endsWith("/")

  if (!hasPath) {
    return ""
  }

  return endsWithSlash ? folderPath : `${folderPath}/`
}

/**
 * 파일에 URL 정보를 추가한다.
 *
 * @param files - URL을 추가할 파일 객체 배열
 * @param bucketName - 파일이 저장된 버킷 이름
 * @param path - 파일이 저장된 경로
 * @returns URL이 추가된 파일 객체 배열
 */
const addUrlsToFiles = (
  files: StorageFile[],
  bucketName: string,
  path: string,
): (StorageFile & { url: string })[] => {
  const normalizedPath = getNormalizedPath(path)

  return files.map(file => ({
    ...file,
    url: getImageUrl(bucketName, `${normalizedPath}${file.name}`)
  }))
}
