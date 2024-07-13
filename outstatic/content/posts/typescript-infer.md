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

만약, infer 없이 배열 요소 타입을 추출하려면, 모든 가능한 배열 타입에 대해 타입을 정의해야 합니다.

예를들어,

```typescript
type ArrayElement<T> =
  T extends (string | number | boolean)[] ? string | number | boolean : never;
```

이 타입에서 배열의 요소 타입이 추가되거나 변경되면, 매번 타입 정의를 수정해주어야 합니다.\
그리고 조건부 타입에서 배열의 요소 타입을 다시 명시해야 하므로, 코드가 중복되고 길어집니다.

infer를 사용한 새로운 타입 정의

```typescript
type ArrayElement<T> = T extends (infer E)[] ? E : never;
```

이렇게 사용하면 타입스크립트가 E 타입을 추론해냅니다.

결과를 살펴보면,

```typescript
const arrayA = ["jgpark", 7281, true, undefined]
type ArrayElement<T> = T extends (infer E)[] ? E : never;
const element: ArrayElement<typeof arrayA> = "welcome"
```

위 코드에서 element의 타입이 \`string | number | boolean | undefined\`로 추론됩니다.\
이처럼 다른 타입의 요소를 추가해도 자동으로 추론되어, 타입이 추가되거나 변경될 때마다 타입 정의를 수정할 필요가 없습니다.