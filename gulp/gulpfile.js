/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 15/04/19
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/*jslint node: true */
/*jslint -W079 */
"use strict";

// setting
var setting = require( './setting.js' );

// gulp / gulp-load-plugins
var gulp = setting.gulp;
var $ = setting.$;

// module
var $$ = setting.module;

var del = $$.del;
var runSequence = $$.runSequence;

// directory
var dir = setting.dir;
var app = dir.app;
var tmp = dir.tmp;
var htdocs = dir.htdocs;

// css prefix
var AUTO_PREFIX_BROWSERS = setting.AUTO_PREFIX_BROWSERS;

// ------------------------------------------------------
// server
//var browserSync = $$.browserSync;
//var reload = $$.reload;
//var pageSpeed = $$.pageSpeed;
var port = setting.port;

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }

// ------------------------------------------------------
// tasks
// ------------------------------------------------------
