var colors = require('colors'),
        fs = require('fs'),
      util = require('util');

module.exports = MoaLog;

function MoaLog(){
  this.level = MoaLog.LEVEL_DEBUG;
}
MoaLog.LEVEL_DEBUG = 1;
MoaLog.LEVEL_INFO = 2;
MoaLog.LEVEL_WARN = 3;
MoaLog.LEVEL_ERROR = 4;
MoaLog.LEVEL_CRIT = 5;
MoaLog.prototype.setLevel = function(level){
  this.level = level;
}
MoaLog.prototype.debug = function(msg){
  if(this.level >= MoaLog.LEVEL_DEBUG){
    this.console('debug'.grey, msg);
  }
}
MoaLog.prototype.info = function(msg){
  if(this.level >= MoaLog.LEVEL_INFO){
    this.console('info'.cyan, msg);
  }
}
MoaLog.prototype.warn = function(msg){
  if(this.level >= MoaLog.LEVEL_WARN){
    this.console('warn'.yellow, msg);
  }
}
MoaLog.prototype.error = function(msg){
  if(this.level >= MoaLog.LEVEL_ERROR){
    this.console('error'.magenta, msg);
  }
}
MoaLog.prototype.crit = function(msg){
  if(this.level >= MoaLog.LEVEL_CRIT){
    this.console('crit'.red, msg);
  }
}
MoaLog.prototype.console = function(type, msg){
//  arguments.length;
  console.log(type, msg);
}
MoaLog.prototype.file = function(name, msg){
  fs.writeFileSync(name, msg);
}
MoaLog.prototype.inspect = function(object){
  console.log(util.inspect(object, { showHidden: true, depth: null }))
}

