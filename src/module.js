/**
 * @ngdoc overview
 * @name jqm
 * @description
 *
 * 'jqm' is the one module that contains all jqm code.
 */

//Save bytes and make code more readable - these vars will be minifed. Angularjs does this
var jqmModule = angular.module("jqm", ["ngTouch", "ngRoute", "ngAnimate", "ajoslin.scrolly", "ui.bootstrap.position"]),
  equals = angular.equals,
  extend = angular.extend,
  forEach = angular.forEach,
  isArray = angular.isArray,
  isDefined = angular.isDefined,
  isObject = angular.isObject,
  isString = angular.isString,
  jqLite = angular.element,
  noop = angular.noop,
  isFunction = angular.isFunction;
