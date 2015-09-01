/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/01 - 16:19
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
/*jshint -W092 */
/**
 * 日本語判定処理
 *
 * @module Eda
 * @submodule Kana
 */
( function ( window ){

  'use strict';

  window.Eda.Kana = ( function (){
    // http://d.hatena.ne.jp/favril/20090514/1242280476
    /**
     * 日本語文字判定 Utility
     *
     * @class Kana
     * @static
     * @constructor
     */
    function Kana () {
      throw new Error( 'Kana can\'t create instance!' );
    }

    var k = Kana;

    /**
     * @method kanji
     * @static
     * @param {string} txt 判定文字列
     * @return {boolean} 漢字かどうかの真偽値を返します
     */
    k.kanji = function ( txt ) {
      var unicode = txt.charCodeAt( 0 );

      return (
        // CJK統合漢字
        ( unicode >= 0x4e00 && unicode <= 0x9fcf ) ||
          // CJK統合漢字拡張A
        ( unicode >= 0x3400  && unicode <= 0x4dbf)  ||
          // CJK統合漢字拡張B
        ( unicode >= 0x20000 && unicode <= 0x2a6df) ||
          // CJK互換漢字
        ( unicode >= 0xf900  && unicode <= 0xfadf)  ||
          // CJK互換漢字補助
        ( unicode >= 0x2f800 && unicode <= 0x2fa1f)
      );

    };

    /**
     * @method hiragana
     * @static
     * @param {string} txt 判定文字列
     * @return {boolean} ひらがなか否かの真偽値を返します
     */
    k.hiragana = function ( txt ) {

      var unicode = txt.charCodeAt( 0 );
      return unicode >= 0x3040 && unicode <= 0x309f;

    };

    /**
     * @method katakana
     * @static
     * @param {string} txt 判定文字列
     * @return {boolean} カナか否かの真偽値を返します
     */
    k.katakana = function ( txt ) {

      var unicode = txt.charCodeAt( 0 );
      return unicode >= 0x30a0 && unicode <= 0x30ff;

    };

    /**
     * @method hankaku
     * @static
     * @param {string} txt 判定文字列
     * @return {boolean} 半角文字か否かの真偽値を返します
     */
    k.hankaku = function ( txt ) {

      var unicode = txt.charCodeAt( 0 );
      return unicode >= 0xff61 && unicode <= 0xff9f;

    };

    /**
     * @method zenkaku
     * @static
     * @param {string} txt 判定文字列
     * @return {boolean} 全角か否かの真偽値を返します
     */
    k.zenkaku = function ( txt ) {

      return k.kanji( txt ) || k.hiragana( txt ) || k.katakana( txt );

    };

    //http://stackoverflow.com/questions/2450641/validating-alphabetic-only-string-in-javascript
    /**
     * @method alphabetic
     * @static
     * @param {string} txt 判定文字列
     * @return {boolean} アルファベットか否かの真偽値を返します、スペースはfalseです
     */
    k.alphabetic = function ( txt ) {

      return /^[a-zA-Z]+$/.test( txt );

    };

    return Kana;
  }() );

}( window ) );