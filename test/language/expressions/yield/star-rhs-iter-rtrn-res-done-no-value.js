// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-generator-function-definitions-runtime-semantics-evaluation
es6id: 14.4.14
description: >
  `value` property is not accessed when iteration is incomplete
info: |
  YieldExpression : yield * AssignmentExpression

  1. Let exprRef be the result of evaluating AssignmentExpression.
  2. Let value be ? GetValue(exprRef).
  3. Let iterator be ? GetIterator(value).
  4. Let received be NormalCompletion(undefined).
  5. Repeat
     a. If received.[[Type]] is normal, then
        [...]
     b. Else if received.[[Type]] is throw, then
        [...]
     c. Else,
        i. Assert: received.[[Type]] is return.
        ii. Let return be ? GetMethod(iterator, "return").
        iii. If return is undefined, return Completion(received).
        iv. Let innerReturnResult be ? Call(return, iterator, «
            received.[[Value]] »).
        v. If Type(innerReturnResult) is not Object, throw a TypeError
           exception.
        vi. Let done be ? IteratorComplete(innerReturnResult).
        vii. If done is true, then
             1. Let value be ? IteratorValue(innerReturnResult).
             2. Return Completion{[[Type]]: return, [[Value]]: value,
                [[Target]]: empty}.
        viii. Let received be GeneratorYield(innerReturnResult).

  7.4.3 IteratorComplete

  1. Assert: Type(iterResult) is Object.
  2. Return ToBoolean(? Get(iterResult, "done")).
features: [Symbol.iterator]
---*/

var badIter = {};
var callCount = 0;
var spyValue = Object.defineProperty({ done: false }, 'value', {
  get: function() {
    callCount += 1;
  }
});
badIter[Symbol.iterator] = function() {
  return {
    next: function() {
      return { done: false };
    },
    return: function() {
      return spyValue;
    }
  };
};
var normalCompletion = false;
var errorCompletion = false;
var delegationComplete = false;
function* g() {
  try {
    yield * badIter;
    normalCompletion = true;
  } catch (_) {
    errorCompletion = true;
  } finally {
    delegationComplete = true;
  }
}
var iter = g();

iter.next();
assert.sameValue(callCount, 0, 'access count (first iteration)');
assert.sameValue(
  delegationComplete, false, 'delegation ongoing (first iteration)'
);

iter.return();
assert.sameValue(callCount, 0, 'access count (second iteration)');
assert.sameValue(
  delegationComplete, false, 'delegation ongoing (second iteration)'
);

spyValue.done = true;
iter.return();
assert.sameValue(callCount, 1, 'access count (final iteration)');
assert.sameValue(delegationComplete, true, 'delegation complete');
assert.sameValue(normalCompletion, false, 'completion was abrupt');
assert.sameValue(errorCompletion, false, 'completion was not of type "throw"');
