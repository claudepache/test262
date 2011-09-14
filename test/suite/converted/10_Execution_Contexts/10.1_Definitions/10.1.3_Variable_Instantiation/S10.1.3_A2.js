// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If two or more formal parameters share the same name, hence
 * the same property, the corresponding property is given the value that was
 * supplied for the last parameter with this name
 *
 * @section 10.1.3
 * @path 10_Execution_Contexts/10.1_Definitions/10.1.3_Variable_Instantiation/S10.1.3_A2.js
 * @description Creating functions initialized with two or more formal parameters, which have the same name
 * @non_strict_only
 */

//CHECK#1
function f1(x, x) {
  return x;
}
if(!(f1(1, 2) === 2)) {
  $ERROR("#1: f1(1, 2) === 2");
}

//CHECK#2
function f2(x, x, x){
  return x*x*x;
}
if(!(f2(1, 2, 3) === 27)){
  $ERROR("f2(1, 2, 3) === 27");
}

//CHECK#3
function f3(x, x) {
  return 'a' + x;
}
if(!(f3(1, 2) === 'a2')){
  $ERROR("#3: f3(1, 2) === 'a2'");
}

