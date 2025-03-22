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
    // 경로 정규화: 폴더 경로가 항상 슬래시('/')로 끝나도록 보장하여 일관된 파일 경로 구성 및 API 요청 가능
    const normalizedPath = getNormalizedPath(folderPath)

    const paginationOptions: Required<ImagePaginationOptions> = {
      limit: options.limit || 20,
      offset: options.offset || 0,
      sortBy: options.sortBy || "created_at",
      sortOrder: options.sortOrder || "desc"
    }

    // Supabase Storage API의 제한으로 이미지 파일만 가져오는 것이 불가능하여 버킷에서 모든 파일을 가져온다.
    const allFiles = await fetchAllFilesFromBucket(bucketName, normalizedPath, paginationOptions)

    if (!allFiles) {
      return { files: null, totalCount: 0 }
    }

    // 버킷에서 가져온 모든 파일에서 이미지 파일만 필터링
    const imageFiles = filterImageFiles(allFiles)

    const paginatedFiles = setPagination(imageFiles, paginationOptions)
    const filesWithUrls = addUrlsToFiles(paginatedFiles, bucketName, normalizedPath)

    return {
      files: filesWithUrls,
      totalCount: imageFiles.length
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
 * 버킷에서 모든 파일을 가져온다.
 *
 * @param bucketName - 버킷 이름
 * @param path - 폴더 경로
 * @param options - 페이지네이션 옵션
 * @returns 모든 파일 목록
 */
const fetchAllFilesFromBucket = async (
  bucketName: string,
  path: string,
  options: Required<ImagePaginationOptions>
): Promise<StorageFile[] | null> => {
  const { sortBy, sortOrder } = options

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .list(path, {
      sortBy: { column: sortBy, order: sortOrder }
    })

  if (error) {
    console.error("Error fetching images from storage:", error)
    return null
  }

  return data as StorageFile[]
}

/**
 * Supabase Storage에는 폴더가 생성되면 .emptyFolderPlaceholder가 존재한다.
 * 이 파일은 폴더의 존재 유무를 확인하는 용도로 사용된다.
 * 이 파일을 제외하고, 이미지 파일만을 필터링한다.
 *
 * @param files - 모든 파일 목록
 * @returns 이미지 파일 목록
 */
const filterImageFiles = (files: StorageFile[]): StorageFile[] => {
  return files.filter(file => {
    const isNotPlaceholder = file.name !== ".emptyFolderPlaceholder"
    const isImageFile = !!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)

    return isNotPlaceholder && isImageFile
  })
}

/**
 * 페이지네이션을 적용한다.
 *
 * 전체 이미지 파일 배열에서 현재 페이지에 해당하는 파일들만 추출한다.
 * offset부터 시작해 limit 개수만큼의 항목을 선택한다.
 *
 * 예시:
 * - offset: 0, limit: 20 → 0번 인덱스부터 19번 인덱스까지의 항목 반환 (첫 번째 페이지)
 * - offset: 20, limit: 20 → 20번 인덱스부터 39번 인덱스까지의 항목 반환 (두 번째 페이지)
 *
 * @param files - 페이지네이션을 적용할 이미지 파일 배열
 * @param options - 페이지네이션 옵션 (offset: 시작점, limit: 항목 개수)
 * @returns 현재 페이지에 해당하는 이미지 파일 하위 배열
 */
const setPagination = (
  files: StorageFile[],
  options: Required<ImagePaginationOptions>,
): StorageFile[] => {
  const { offset, limit } = options

  return files.slice(offset, offset + limit)
}

/**
 * 파일에 URL 정보를 추가한다.
 *
 * Supabase Storage에서 가져온 파일 객체에 접근 가능한 URL을 추가한다.
 * 각 파일 객체를 순회하여 getImageUrl 함수를 통해 CDN URL을 생성하고,
 * 원본 파일 객체에 url 속성으로 추가한다.
 *
 * 이 URL은 클라이언트 측에서 이미지를 표시하는 데 사용된다.
 *
 * 예시:
 * 원본 파일: { name: "image.jpg", ... }
 * 변환 후: { name: "image.jpg", ..., url: "https://example.com/storage/bucket/path/image.jpg" }
 *
 * @param files - URL을 추가할 파일 객체 배열
 * @param bucketName - 파일이 저장된 버킷 이름
 * @param path - 파일이 저장된 경로 (슬래시로 끝나는 정규화된 경로)
 * @returns URL이 추가된 파일 객체 배열
 */
const addUrlsToFiles = (
  files: StorageFile[],
  bucketName: string,
  path: string,
): (StorageFile & { url: string })[] => {
  return files.map(file => ({
    ...file,
    url: getImageUrl(bucketName, `${path}${file.name}`)
  }))
}
