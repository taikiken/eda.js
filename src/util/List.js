/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/01 - 17:14
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
 * 配列 utilities
 *
 * @module Eda
 * @submodule Kana
 */
( function ( window ) {

  'use strict';

  window.Eda.List = ( function () {

    var
      _rand = Math.random,
      _floor = Math.floor,
      _max = Math.max;

    /**
     * Array ヘルパー
     * @class List
     * @static
     * @constructor
     */
    function List () {
      throw new Error( 'List can\'t create instance' );
    }

    var p = List.prototype;
    p.constructor = List;

    /**
     * word で埋められた配列を length 長分作成します
     *
     * @method word
     * @static
     * @param {int} length
     * @param {int|string} word
     * @return {Array}
     */
    List.word = function ( length, word ) {

      var arr = [], i;

      for ( i = 0; i < length; i++ ) {

        arr[ i ] = word;

      }

      return arr;

    };

    /**
     * 0 で埋められた配列を length 長分作成します
     *
     * @method zero
     * @static
     * @param {int} length
     * @return {Array}
     */
    List.zero = function ( length ) {

      return this.word( length, 0 );

    };

    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // https://github.com/coolaj86/knuth-shuffle/blob/master/index.js
    /**
     * 配列をシャッフルします
     *
     * @method shuffle
     * @static
     * @param {Array} array
     * @return {Array} シャッフル後の配列を返します
     */
    List.shuffle = function ( array ) {

      var
        currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while ( 0 !== currentIndex ) {

        // Pick a remaining element...
        randomIndex = _floor( _rand() * currentIndex );
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[ currentIndex ];
        array[ currentIndex ] = array[ randomIndex ];
        array[ randomIndex ] = temporaryValue;

      }

      return array;

    };

    // http://bost.ocks.org/mike/shuffle/
    /**
     * @method shuffle2
     * @static
     * @param {Array} array
     * @return {Array} シャッフル後の配列を返します
     */
    List.shuffle2 = function ( array ) {

      var copy = [], n = array.length, i;

      // While there remain elements to shuffle…
      while ( n ) {

        // Pick a remaining element…
        i = _floor( _rand() * array.length );

        // If not already shuffled, move it to the new array.
        if ( i in array ) {

          copy.push( array[ i ] );
          delete array[ i ];
          --n;

        }

      }

      return copy;

    };

    /**
     * 配列内の最大数値を返します
     *
     * 配列は全て数値で無いといけません
     *
     * 文字が含まれていると NaN を返します
     *
     * @method max
     * @static
     * @param {Array} arr 検証対象の配列、内部は全部数値 [Number, [Number]]
     * @return {number} 配列内の最大数値を返します
     */
    List.max = function ( arr ) {

      return _max.apply( null, arr );

    };

    return List;

  }() );

}( window ) );