'use strict';

const MoaLog = require('index');

MoaLog.log('set level = 0(L_ALL)');
MoaLog.setLevel(0);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log();

MoaLog.log('set level = 1(L_DEBUG)');
MoaLog.setLevel(1);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log();

MoaLog.log('set level = 2(L_INFO)');
MoaLog.setLevel(2);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log();

MoaLog.log('set level = 3(L_WARN)');
MoaLog.setLevel(3);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log();

MoaLog.log('set level = 4(L_ERROR)');
MoaLog.setLevel(4);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log();

MoaLog.log('set level = 5(L_CRIT)');
MoaLog.setLevel(5);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.console('MoaLog.console');
MoaLog.log('MoaLog.log');
MoaLog.file('sss', 'as');
MoaLog.inspect({key: 'value', key2: 'value2'});
MoaLog.inspect({k1: {k2: {k3: {k4: {k5: {k6: 'v6'}}}}}});
