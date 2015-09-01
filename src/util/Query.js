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