var colors = require('colors').enabled = true,
        fs = require('fs'),
      util = require('util'),
      path = require('path'),
    appDir = path.dirname(require.main.filename);

module.exports = MoaLog;

function MoaLog(){
  this.level = MoaLog.LEVEL_DEBUG;
}
MoaLog.LEVEL_ALL = 0;
MoaLog.LEVEL_DEBUG = 1;
MoaLog.LEVEL_INFO = 2;
MoaLog.LEVEL_WARN = 3;
MoaLog.LEVEL_ERROR = 4;
MoaLog.LEVEL_CRIT = 5;
MoaLog.L_ALL = 0;
MoaLog.L_DEBUG = 1;
MoaLog.L_INFO = 2;
MoaLog.L_WARN = 3;
MoaLog.L_ERROR = 4;
MoaLog.L_CRIT = 5;
MoaLog.prototype.setLevel = function(level){
  this.level = level;
}
MoaLog.prototype.all = function(){
  if(this.level <= MoaLog.LEVEL_ALL){
    console.log.apply(this, Array.prototype.concat('  all'.grey, Array.prototype.slice.call(arguments, 0)));
  }
}
MoaLog.prototype.debug = function(){
  if(this.level <= MoaLog.LEVEL_DEBUG){
    console.log.apply(this, Array.prototype.concat('debug'.grey, Array.prototype.slice.call(arguments, 0)));
  }
}
MoaLog.prototype.info = function(){
  if(this.level <= MoaLog.LEVEL_INFO){
    console.log.apply(this, Array.prototype.concat(' info'.cyan, Array.prototype.slice.call(arguments, 0)));
  }
}
MoaLog.prototype.warn = function(){
  if(this.level <= MoaLog.LEVEL_WARN){
    console.log.apply(this, Array.prototype.concat(' warn'.yellow, Array.prototype.slice.call(arguments, 0)));
  }
}
MoaLog.prototype.error = function(){
  if(this.level <= MoaLog.LEVEL_ERROR){
    console.log.apply(this, Array.prototype.concat('error'.magenta, Array.prototype.slice.call(arguments, 0)));
  }
}
MoaLog.prototype.crit = function(){
  if(this.level <= MoaLog.LEVEL_CRIT){
    console.log.apply(this, Array.prototype.concat(' crit'.red, Array.prototype.slice.call(arguments, 0)));
  }
}
MoaLog.prototype.console = function(type){
//  arguments.length;
  console.log.apply(this, Array.prototype.slice.call(arguments, 0));
}
MoaLog.prototype.file = function(name, msg){
  fs.writeFileSync(appDir+'/'+name, msg);
}
MoaLog.prototype.inspect = function(object){
  console.log(util.inspect(object, { showHidden: true, depth: null }))
}


