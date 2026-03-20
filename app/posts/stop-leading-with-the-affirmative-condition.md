---
title: Stop leading with the affirmative condition
createdDate: "2026-03-20"
description: Why do developers lead with the affirmative condition? In my opinion, it adds unnecessary overhead when reading code.
---

When writing conditionals, I often see developers lead with the condition they want to handle first. For the sake of this post, I'll call that the "affirmative condition." This is not necessarily the happy path or the failure path; it could be either. Regardless, it can lead to confusing code because developers may bend their logic out of shape to ensure the affirmative condition is evaluated first.

The worst example I've seen looks something like this:

```js
if (!isDisabled) {
  // Handle affirmative condition case
}
```

_A double negation!_ I hate this with all of my heart. It makes unfamiliar code that much harder to parse, especially during code review or when learning a new codebase. You might argue that this is irrelevant in 2026, when AI can write code for you, but I still don't trust AI to write my code sight unseen. I especially don't trust the code AI produced on behalf of someone else. Sorry, I have trust issues and an ego.

But if you're going to do it, maybe introduce some intermediate variables to simplify the conditional?

```js
let isEnabled = !isDisabled

if (isEnabled) {
  // Handle affirmative condition case
}
```

That's much easier to read. Don't you agree?
