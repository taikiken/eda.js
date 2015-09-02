/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/02 - 12:30
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for eda.js
 */
/**
 * 何日後, 何時間後 時間管理
 *
 * @module Eda
 * @submodule Time
 */
( function ( window ) {

  'use strict';

  window.Eda.Time = ( function () {

    /**
     * 時間管理
     *
     * @class Time
     * @static
     * @constructor
     */
    function Time () {
      throw new Error( 'Time can\'t create instance!' );
    }

    var p = Time.prototype;
    p.constructor = Time;

    /**
     * @const SECOND
     * @default 1000
     * @type {number}
     */
    Time.SECOND = 1000;
    /**
     * @const MINUTE
     * @default 1000 * 60
     * @type {number}
     */
    Time.MINUTE = 1000 * 60;
    /**
     * @const HOUR
     * @default 1000 * 60 * 60
     * @type {number}
     */
    Time.HOUR = 1000 * 60 * 60;
    /**
     * @const DAY
     * @default 1000 * 60 * 60 * 24
     * @type {number}
     */
    Time.DAY = 1000 * 60 * 60 * 24;

    /**
     * @method hours
     * @static
     * @param {number} hour
     * @return {Date}
     */
    Time.hours = function ( hour ) {

      return new Date( new Date().getTime() + Time.HOUR * hour );

    };
    /**
     * @method days
     * @static
     * @param {number} day
     * @return {Date}
     */
    Time.days = function ( day ) {

      return new Date( new Date().getTime() + Time.DAY * day );

    };

    return Time;

  }() );

}( window ) );