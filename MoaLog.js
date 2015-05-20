var colors = require('colors').enabled = true,
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
MoaLog.prototype.debug = function(type){
  if(this.level >= MoaLog.LEVEL_DEBUG){
    if(arguments.length==1){
      console.log('debug'.grey, arguments[0]);
    }
    else{
      console.log(type.grey, arguments[1]);
    }
  }
}
MoaLog.prototype.info = function(type){
  if(this.level >= MoaLog.LEVEL_INFO){
    if(arguments.length==1){
      console.log('info'.cyan, arguments[0]);
    }
    else{
      console.log(type.cyan, arguments[1]);
    }
  }
}
MoaLog.prototype.warn = function(type){
  if(this.level >= MoaLog.LEVEL_WARN){
    if(arguments.length==1){
      console.log('warn'.yellow, arguments[0]);
    }
    else{
      console.log(type.yellow, arguments[1]);
    }
  }
}
MoaLog.prototype.error = function(type){
  if(this.level >= MoaLog.LEVEL_ERROR){
    if(arguments.length==1){
      console.log('yellow'.magenta, arguments[0]);
    }
    else{
      console.log(type.magenta, arguments[1]);
    }
  }
}
MoaLog.prototype.crit = function(type){
  if(this.level >= MoaLog.LEVEL_CRIT){
    if(arguments.length==1){
      console.log('crit'.red, arguments[0]);
    }
    else{
      console.log(type.red, arguments[1]);
    }
  }
}
MoaLog.prototype.console = function(type){
//  arguments.length;
  if(arguments.length==1){
    console.log(type);
  }
  else if(arguments.length==2){
    console.log(type, arguments[1]);
  }
  else if(arguments.length==3){
    console.log(type, arguments[1], arguments[2]);
  }
  else if(arguments.length==4){
    console.log(type, arguments[1], arguments[2], arguments[3]);
  }
  else if(arguments.length==5){
    console.log(type, arguments[1], arguments[2], arguments[3], arguments[4]);
  }
  else{
    console.log(arguments);
  }
}
MoaLog.prototype.file = function(name, msg){
  fs.writeFileSync(name, msg);
}
MoaLog.prototype.inspect = function(object){
  console.log(util.inspect(object, { showHidden: true, depth: null }))
}


