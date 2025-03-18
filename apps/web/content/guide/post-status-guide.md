---
title: '블로그 포스트 상태 가이드'
status: 'published'
author:
  name: 'jgpark'
slug: 'post-status-guide'
description: '블로그 포스트 상태 값 사용 가이드'
publishedAt: '2023-01-01T00:00:00.000Z'
draft: false
---

# 블로그 포스트 상태 가이드

이 문서는 블로그 포스트 작성 시 사용할 수 있는 상태(status) 값에 대한 가이드입니다.

## 포스트 상태 값

모든 마크다운 파일의 frontmatter에는 `status` 필드가 포함되어야 합니다. 다음 네 가지 값 중 하나를 사용하세요:

```yaml
status: 'published' # 공개 게시물 - 모든 사용자에게 표시됨
status: 'draft'     # 작성 중인 게시물 - 공개되지 않음, 작성 중
status: 'private'   # 비공개 게시물 - 특정 사용자만 접근 가능
status: 'archived'  # 보관된 게시물 - 이전에 공개되었으나 지금은 숨겨짐
```

## 사용 예시

새 포스트를 작성할 때는 일반적으로 다음과 같은 과정을 따릅니다:

1. 처음 작성 시 `status: 'draft'`로 설정
2. 게시 준비가 되면 `status: 'published'`로 변경
3. 임시로 숨기고 싶을 때 `status: 'private'`으로 변경
4. 더 이상 표시하지 않고 보관하려면 `status: 'archived'`로 변경

## 주의사항

- 포스트 상태는 언제든지 변경할 수 있습니다.
- frontmatter에 status 필드가 없는 경우 기본값은 'draft'로 간주됩니다.
- 'published' 상태만 일반 사용자에게 공개됩니다.
