-- 이미지 파일 목록을 가져오는 RPC 함수
CREATE OR REPLACE FUNCTION public.get_files_from_storage(
  bucketname TEXT,
  folderpath TEXT,
  limit_val INTEGER DEFAULT 20,
  offset_val INTEGER DEFAULT 0,
  sortby TEXT DEFAULT 'created_at',
  sortorder TEXT DEFAULT 'desc'
)
RETURNS SETOF storage.objects
SECURITY DEFINER
AS $$
DECLARE
  direction TEXT := 'DESC';
BEGIN
  -- 정렬 방향 설정
  IF sortorder = 'asc' THEN
    direction := 'ASC';
  END IF;

  -- 이미지 파일 조회
  RETURN QUERY EXECUTE format('
    SELECT *
    FROM storage.objects
    WHERE bucket_id = %L
    AND name LIKE %L || ''%%''
    AND name NOT LIKE ''%%.emptyFolderPlaceholder''
    AND (
      name ILIKE ''%%.jpg'' OR
      name ILIKE ''%%.jpeg'' OR
      name ILIKE ''%%.png'' OR
      name ILIKE ''%%.gif'' OR
      name ILIKE ''%%.webp''
    )
    ORDER BY %I ' || direction || '
    LIMIT %L OFFSET %L',
    bucketname,
    folderpath,
    sortby,
    limit_val,
    offset_val
  );
END;
$$ LANGUAGE plpgsql;

-- 이미지 파일 개수를 가져오는 RPC 함수
CREATE OR REPLACE FUNCTION public.get_files_count(
  bucketname TEXT,
  folderpath TEXT
)
RETURNS INTEGER
SECURITY DEFINER
AS $$
DECLARE
  count_val INTEGER;
BEGIN
  -- 이미지 파일 개수 조회
  SELECT COUNT(*)
  INTO count_val
  FROM storage.objects
  WHERE bucket_id = bucketname
  AND name LIKE folderpath || '%'
  AND name NOT LIKE '%.emptyFolderPlaceholder'
  AND (
    name ILIKE '%.jpg' OR
    name ILIKE '%.jpeg' OR
    name ILIKE '%.png' OR
    name ILIKE '%.gif' OR
    name ILIKE '%.webp'
  );

  RETURN count_val;
END;
$$ LANGUAGE plpgsql;

-- RPC 함수에 대한 접근 권한 부여
GRANT EXECUTE ON FUNCTION public.get_files_from_storage TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_files_count TO anon, authenticated;

-- storage.objects 테이블에 대한 RLS 정책 생성
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- storage 읽기 정책
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (true);
