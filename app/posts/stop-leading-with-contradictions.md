---
title: Stop leading with contradictions
createdDate: "2026-03-17"
description: Why do developers lead with contradictions? It adds that much more overhead when reading code.
---

Test.

```tsx
/**
 * Returns a value
 */
function test() {
  let x = Math.random()

  return x + 10 > 0.5 ? "Bacon" : "Spring roll"
}

// My comment
function Component({ ...props }) {
  const message = "Hello, World!"

  return (
    <div>
      <p>This is a test</p>
      <p>{message}</p>
      <div>{props.data}</div>
    </div>
  )
}

class TestClass {
  constructor() {
    this.x = 100
  }
}
```
