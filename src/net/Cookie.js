/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/02 - 11:37
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
/*jslint -W016*/
/**
 * document.cookie helper
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 *
 * thanks MDN
 *
 * @module Eda
 * @submodule Cookie
 */
( function ( window ) {

  'use strict';

  var
    document = window.document;

  window.Eda.Cookie = ( function () {

    var
      _decode = decodeURIComponent,
      _encode = encodeURIComponent;

    /**
     * @class Cookie
     * @static
     * @constructor
     */
    function Cookie () {
      throw new Error( 'Cookie can\'t create instance!' );
    }

    var p = Cookie.prototype;
    p.constructor = Cookie;

    /**
     * document.cookie 取得
     * @method item
     * @param {string} keyName 取得 cookie name
     * @return {string|null} cookie 値を返します、取得できない場合は null を返します。
     * @static
     */
    Cookie.item = function ( keyName ) {

      var
        result = null;

      if ( !!keyName ) {

        result = _decode( document.cookie.replace( new RegExp("(?:(?:^|.*;)\\s*" + _encode( keyName ).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

      }

      return result;

    };

    /**
     * document.cookie 全て取得し列挙します
     * @method all
     * @return {Array} document.cookie key name 配列を返します
     * @static
     */
    Cookie.all = function () {

      var
        cookies = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/ ),
        i, limit;

      for ( i = 0, limit = cookies.length; i < limit; i = (i + 1)|0 ) {

        cookies[ i ] = _decode( cookies[ i ] );

      }

      return cookies;

    };

    /**
     * document.cookie 引数 keyName が存在するかを調べます
     * @method has
     * @param keyName document.cookie 名称
     * @return {boolean} true / false
     * @static
     */
    Cookie.has = function ( keyName ) {

      var
        result = false;

      if ( !!keyName ) {

        result = ( new RegExp("(?:^|;\\s*)" + _encode( keyName ).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test( document.cookie );

      }

      return result;

    };

    /**
     * document.cookie 削除
     * @method remove
     * @param {String} keyName document.cookie 名称
     * @param {String} [path] document.cookie path
     * @param {String} [domain] document.cookie domain
     * @return {boolean} 削除に成功したかの真偽値を返します
     * @static
     */
    Cookie.remove = function ( keyName, path, domain ) {

      var
        result = false;

      if ( Cookie.has( keyName ) ) {

        document.cookie = _encode( keyName ) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( !!domain ? '; domain=' + domain : '' ) + ( !!path ? '; path=' + path : '' );
        result = true;

      }

      return result;

    };

    /**
     * document.cookie 保存
     * @for CookieUtil
     * @method setItem
     * @param {String} keyName document.cookie 名称
     * @param {String} value document.cookie value
     * @param {String|Number|Date|*} [end] document.cookie 期限, [ second, Date.toUTCString ]
     * @param {String} [path] document.cookie path
     * @param {String} [domain] document.cookie domain
     * @param {String} [secure] document.cookie secure
     * @return {boolean} 保存に成功したかの真偽値を返します
     * @static
     */
    Cookie.set = function ( keyName, value, end, path, domain, secure ) {

      if ( !keyName || /^(?:expires|max\-age|path|domain|secure)$/i.test( keyName ) ) {

        return false;

      }

      var exp = '';

      if ( !!end ) {

        switch ( typeof end ) {

          case 'number' :
            exp = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
            break;

          case 'string' :
            exp = '; expires=' + end;
            break;

          default :
            if ( end.constructor === Date ) {

              exp = '; expires=' + end.toUTCString();

            }
            break;

        }

      }

      document.cookie = _encode( keyName ) + '=' + _encode( value ) + exp + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' ) + (secure ? '; secure' : '' );
      return true;

    };

    return Cookie;

  }() );

}( window ) );