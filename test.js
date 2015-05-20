var log = require('./index');

log.console('title','message');
log.inspect({key:'value'});
log.setLevel(2);
log.all('dall');
log.debug('debug');
log.info('info');
log.warn('warning');
log.error('error');
log.crit('critical');
log.console('-----------------------------');
log.info('info2'.yellow, 'info3');
