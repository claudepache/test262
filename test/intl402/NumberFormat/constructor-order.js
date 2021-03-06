// Copyright 2019 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-initializenumberformat
description: Checks handling of the unit option with the currency style.
info: |
    SetNumberFormatUnitOptions ( intlObj, options )

    5. Let currency be ? GetOption(options, "currency", "string", undefined, undefined).
    6. If currency is not undefined, then
        a. If the result of IsWellFormedCurrencyCode(currency) is false, throw a RangeError exception.
    9. Let unit be ? GetOption(options, "unit", "string", undefined, undefined).
    10. If unit is not undefined, then
        a. If the result of IsWellFormedUnitIdentifier(unit) is false, throw a RangeError exception.
    12. If style is "currency", then
        a. If currency is undefined, throw a TypeError exception.
    13. If style is "unit", then
        a. If unit is undefined, throw a TypeError exception.
features: [Intl.NumberFormat-unified]
---*/

assert.throws(RangeError, () => {
  new Intl.NumberFormat([], { style: "currency", unit: "test" })
});

assert.throws(RangeError, () => {
  new Intl.NumberFormat([], { style: "unit", currency: "test" })
});
