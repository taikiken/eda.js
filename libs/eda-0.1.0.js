/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 15/09/01 - 16:17
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * version 0.1.0
 * build 2015-09-01 20:07:58
 * github: https://github.com/taikiken/eda.js
 */

/**
 * @module Eda
 * @type {*}
 */
var Eda = Eda || {};

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
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/09/01 - 17:29
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

  window.Eda.Query = ( function () {

    var
      _decode = window.decodeURIComponent;

    /**
     * @class Query
     * @constructor
     */
    function Query () {

      this.results = null;

    }

    var p = Query.prototype;
    p.constructor = Query;

    /**
     * @method parse
     * @param {string=undefined} [search] window.location.search.substring( 1 )
     */
    p.parse = function ( search ) {

      var results = Query.parse( search );
      this.results = results;

      return results;

    };

    /**
     * @method find
     * @param {string} keyName
     * @return {*}
     */
    p.find = function ( keyName ) {

      var
        results = this.results;

      if ( results === null ) {

        results = Query.parse();
        this.results = results;

      }

      return results[ keyName ];

    };

    // -------------------------------------------------------

    /**
     * @method search
     * @static
     * @return {string}
     */
    Query.search = function () {

      return window.location.search.substring( 1 );

    };

    /**
     *
     * @method parse
     * @static
     * @param {String} [search] window.location.search.substring( 1 )
     * @return {*}
     */
    Query.parse = function ( search ) {

      search = search || Query.search();

      var
        vars,
        results,
        i, limit, pair;

      if ( !!search ) {


        search = search.replace( '&amp;', '&' );
        vars = search.split( '&' );
        results = {};

        for ( i = 0, limit = vars.length; i < limit; i = (i + 1)|0 ) {

          pair = vars[ i ].split( '=' );
          if ( pair.length === 2 ) {

            results[ _decode( pair[ 0 ] ) ] = _decode( pair[ 1 ] );

          }

        }

      }

      return results;

    };

    /**
     * location.search から keyName value を返します
     * @method find
     * @param {string} keyName
     * @return {*} location.search keyName value を返します
     */
    Query.find = function ( keyName ) {

      var
        results = Query.parse();

      return results[ keyName ];

    };

    return Query;

  }() );

}( window ) );
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