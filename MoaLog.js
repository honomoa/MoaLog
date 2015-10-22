'use strict';

var fs     = require('fs');
var util   = require('util');
var path   = require('path');

var appDir = path.dirname(require.main.filename);

require('colors').enabled = true;

module.exports = (function(){

  MoaLog.LEVEL_ALL = MoaLog.L_ALL = 0;
  MoaLog.LEVEL_DEBUG = MoaLog.L_DEBUG = 1;
  MoaLog.LEVEL_INFO = MoaLog.L_INFO = 2;
  MoaLog.LEVEL_WARN = MoaLog.L_WARN = 3;
  MoaLog.LEVEL_ERROR = MoaLog.L_ERROR = 4;
  MoaLog.LEVEL_CRIT = MoaLog.L_CRIT = 5;

  function MoaLog(){
    this.level = MoaLog.LEVEL_DEBUG;
  }

  MoaLog.prototype.setLevel = function(level){
    this.level = level;
  };
  MoaLog.prototype.all = function(){
    if(this.level <= MoaLog.LEVEL_ALL){
      console.log.apply(console, Array.prototype.concat('  all'.grey, Array.prototype.slice.call(arguments, 0)));
    }
  };
  MoaLog.prototype.debug = function(){
    if(this.level <= MoaLog.LEVEL_DEBUG){
      console.log.apply(console, Array.prototype.concat('debug'.grey, Array.prototype.slice.call(arguments, 0)));
    }
  };
  MoaLog.prototype.info = function(){
    if(this.level <= MoaLog.LEVEL_INFO){
      console.log.apply(console, Array.prototype.concat(' info'.cyan, Array.prototype.slice.call(arguments, 0)));
    }
  };
  MoaLog.prototype.warn = function(){
    if(this.level <= MoaLog.LEVEL_WARN){
      console.log.apply(console, Array.prototype.concat(' warn'.yellow, Array.prototype.slice.call(arguments, 0)));
    }
  };
  MoaLog.prototype.error = function(){
    if(this.level <= MoaLog.LEVEL_ERROR){
      console.log.apply(console, Array.prototype.concat('error'.magenta, Array.prototype.slice.call(arguments, 0)));
    }
  };
  MoaLog.prototype.crit = function(){
    if(this.level <= MoaLog.LEVEL_CRIT){
      console.log.apply(console, Array.prototype.concat(' crit'.red, Array.prototype.slice.call(arguments, 0)));
    }
  };
  MoaLog.prototype.console = function(){
    console.log.apply(console, Array.prototype.slice.call(arguments, 0));
  };
  MoaLog.prototype.file = function(name, msg){
    if(msg.toString()==='[object Object]'){
      msg = JSON.stringify(msg);
    }
    fs.writeFileSync(appDir+'/'+name, msg+"\n", {flag: 'a+'});
  };
  MoaLog.prototype.inspect = function(object){
    console.log(util.inspect(object, { showHidden: true, depth: null }));
  };

  return MoaLog;
})();
