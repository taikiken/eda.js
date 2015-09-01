/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/01 - 16:26
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
 * 数にまつわる Utilities
 *
 * @module Eda
 * @submodule Num
 */
( function ( window ) {

  'use strict';

  window.Eda.Num = ( function () {

    var
      _float = parseFloat,
      _rand = Math.random,
      _floor = Math.floor;

    /**
     * @class Num
     * @constructor
     */
    function Num () {
      throw new Error( 'Num can\'t create instance.' );
    }

    var p = Num.prototype;
    p.constructor = Num;

    /**
     * 3桁毎にカンマ(,)を挿入します
     * @method comma
     * @static
     * @param {number|string} n
     * @return {string} カンマ挿入後の文字列を返します
     */
    Num.comma = function ( n ) {

      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    };

    /**
     * 範囲指定乱数生成
     *
     * @method random
     * @static
     * @param {Number} min 最小値
     * @param {Number} [max] 最大値 optional
     * @return {Number} min ~ max 間の乱数(Int)を発生させます
     */
    Num.random = function ( min, max ) {

      if ( !Num.is( max ) ) {

        // max 指定が無い場合
        // 0 ~ min の範囲で乱数生成
        max = min;
        min = 0;

      }

      min = _float( min );
      max = _float( max );

      return min + _floor( _rand() * ( max - min + 1 ) );

    };

    // http://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript
    /**
     * 数値チェック
     *
     * 文字型でも true になる場合があります
     *
     * '10': true, typeof '10': string
     *
     * @method is
     * @static
     * @param {*} obj
     * @return {boolean} true: Number, false: not Number
     */
    Num.is = function ( obj ) {

      return !isNaN( obj );

    };

    return Num;

  }() );

}( window ) );