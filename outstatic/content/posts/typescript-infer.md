---
title: 'Typescript - infer'
status: 'published'
author:
  name: 'jgpark'
  picture: 'https://avatars.githubusercontent.com/u/150231680?v=4'
slug: 'typescript-infer'
description: '복잡한 제네릭 타입에서 타입 추론을 자동으로 해보자.'
coverImage: ''
publishedAt: '2024-07-08T14:47:38.795Z'
---

설명하기에 앞서 먼저 타입 추론에 불편한 상황을 생각해보겠습니다.

```typescript
type ArrayElement = string | number | boolean;

const arrayA: ArrayElement[] = ["jgpark", 7281, true];
```

위 코드에서 만약 arrayA의 요소 중 true를 없앤다면 ArrayElement 타입에서 boolean을 빼주어야한다.

물론 위 코드에서 Type Annotation은 불필요하다. Type Annotation이 없더라도 타입스크립트가 알아서 타입 추론을 잘 해주는 것을 확인할 수 있다.

아래 코드에서 arrayA는 `string | number | boolean` 타입으로 추론된다.

```typescript
type ArrayElement = string | number | boolean;

const arrayA = ["jgpark", 7281, true];
```