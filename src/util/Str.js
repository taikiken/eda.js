/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/01 - 18:02
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
( function ( window ) {

  'use strict';

  var
    Eda = window.Eda;

  Eda.Str = ( function () {

    var
      Num = Eda.Num;

    function Str () {

    }

    var p = Str.prototype;
    p.constructor = Str;

    /**
     * 文字長を検査します
     * @method long
     * @static
     * @param {string} str 検査対象文字列
     * @param {int} long 文字長
     * @return {boolean} 文字列 length が文字長と同じかの真偽値を返します
     */
    Str.long = function ( str, long ) {

      return ( str + '' ).length === ( long * 1 );

    };

    /**
     * mail address validate
     *
     * メール形式簡易チェック
     * @method mail
     * @param {string} str 検査対象文字列
     * @static
     * @return {boolean} 文字列がメール形式かの真偽値を返します
     */
    Str.mail = function ( str ) {

      return !!str.match(/^[\w!#$%&'*+\/=?\^_@{}\\|~\-]+([\w!#$%&'*+\/=?\^_{}\\|~\.\-]+)*@([\w][\w\-]*\.)+[\w][\w\-]*$/);
      // 日本語メールアドレスをtrueにするので不採用
      // http://stackoverflow.com/questions/2855865/jquery-regex-validation-of-e-mail-address
      //var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      //return _pattern.test( str );

    };

    /**
     * @method phone
     * @param {string|number} phone1 市外局番
     * @param {string|number} phone2 市内番号
     * @param {string|number} phone3 識別番号
     * @return {boolean} 電話番号形式かを返します
     */
    Str.phone = function ( phone1, phone2, phone3 ) {

      var
        phone, result,
        number3, number4;

      phone1 = '' + phone1;
      phone2 = '' + phone2;
      phone3 = '' + phone3;

      phone = phone1 + '-' + phone2 + '-' + phone3;

      result = phone.match(/0\d{1,4}-\d{1,4}-\d{3,4}$/);
      result = !!result;

      if ( !result ) {

        return false;

      }

      number3 = '' + phone1 + phone2 + phone3;
      number4 = '' + phone1 + phone2;

      // 11けた（携帯） あるいは 10けた（固定電話）
      if ( number3.length !== 11 && number3.length !== 10 ) {

        return false;

      }

      // 市外局番 + 市内局番 6 or 7
      if ( number4.length !== 6 && number4.length !== 7 ) {

        return false;

      }

      // 数値チェック
      if ( !Num.is( phone1 ) || !Num.is( phone2 ) || !Num.is( phone3 ) ) {

        return false;

      }

      // 正チェック
      if ( phone1 <= 0 || phone2 <= 0 || phone3 <= 0 ) {

        return false;

      }

      // 市外局番は 2桁以上
      if ( phone1.length < 2 ) {

        return false;

      }

      // 先頭文字は 0
      if ( phone1.substr( 0, 1 ) !== '0' ) {

        return false;

      }

      // 識別番号は 3桁 あるいは 4桁
      if ( phone3.length < 3 || phone3.length > 4 ) {

        return false;

      }

      // 0120 フリーダイヤル
      if ( phone1 === '0120' ) {

        // 0120 の時は 3桁 + 3桁 必須
        if ( !Str.long( phone2, 3 ) || Str.long( phone3, 3 ) ) {

          return false;

        }

      } else {

        // 0120 以外は 4桁必須
        if ( phone3.length !== 4 ) {

          return false;

        }

      }

      // may be OK
      return true;

    };
    /**
     * @method zip
     * @static
     * @param {number|string} zip1
     * @param {number|string} zip2
     * @return {*}
     */
    Str.zip = function (  zip1, zip2  ) {

      if ( !Num.is( zip1 ) ) {

        return false;

      }

      if ( zip1 <= 0 ) {

        return false;

      }

      if ( !Str.long( zip1, 3 ) ) {

        return false;

      }

      if ( !Num.is( zip2 ) ) {

        return false;

      }

      if ( zip2 < 0 ) {

        return false;

      }

      return Str.long( zip2, 4 );

    };

    // http://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
    /**
     * 改行コードを LF へ統一します
     * @method lf
     * @static
     * @param {string} str
     * @return {void|string|XML}
     */
    Str.lf = function ( str ) {

      return str.replace( /(?:\r\n|\r)/g, "\n" );

    };

    /**
     * 改行コードを削除します
     * @method removeNL
     * @static
     * @param {String} str
     * @return {void|string|XML}
     */
    Str.removeNL = function ( str ) {

      return str.replace( /(?:\r\n|\r|\n)/g, '' );

    };

    /**
     * スペースを削除します
     * @method removeSpace
     * @static
     * @param {String} str
     * @return {void|string|XML}
     */
    Str.removeSpace = function ( str ) {

      return str.replace( /\s\s+/g, '' );

    };

    /**
     * Tabコードを削除します
     * @method removeTab
     * @static
     * @param {String} str
     * @return {void|string|XML}
     */
    Str.removeTab = function ( str ) {

      return str.replace( /\t/g, '' );

    };

    /**
     * white space(space, tab, new line) を全て削除します
     *
     * @method removeWhitespace
     * @param {String} str
     * @return {void|string|XML}
     */
    Str.removeWhitespace = function ( str ) {

      return str.replace(/\s/g, '');

    };

    return Str;

  }() );

}( window ) );