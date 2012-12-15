/**
 * -*- coding: utf-8 -*-
 * @author Kirill "Nemoden" K <i@nemoden.com>
 * $ Date: Sat 15 Dec 2012 06:39:13 PM VLAT $
 */
var express = require("express"),
    app = express(),
    cons = require('consolidate'),
    swig = require('swig');

app.engine('html', cons.swig);
// .html is default extension for the templates
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
swig.init({
  allowErrors: false,
  autoescape: true,
  cache: true,
  encoding: 'utf8',
  filters: {},
  root: __dirname + '/templates',
  tags: {},
  extensions: {},
  tzOffset: 0
});

app.get('/', function(req,res) {
  res.render('index');
});

app.listen(3000);
console.log('Listening for the end of the world on port 3000');
