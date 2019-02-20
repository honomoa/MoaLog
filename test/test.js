'use strict';

const MoaLog = require('../index');

MoaLog.log('set level = 0(L_ALL)');
MoaLog.setLevel(MoaLog.L_ALL);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log('-------------------------------------------');

MoaLog.log('set level = 1(L_DEBUG)');
MoaLog.setLevel(MoaLog.L_DEBUG);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log('-------------------------------------------');

MoaLog.log('set level = 2(L_INFO)');
MoaLog.setLevel(MoaLog.L_INFO);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log('-------------------------------------------');

MoaLog.log('set level = 3(L_WARN)');
MoaLog.setLevel(MoaLog.L_WARN);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log('-------------------------------------------');

MoaLog.log('set level = 4(L_ERROR)');
MoaLog.setLevel(MoaLog.L_ERROR);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log('-------------------------------------------');

MoaLog.log('set level = 5(L_CRIT)');
MoaLog.setLevel(MoaLog.L_CRIT);
MoaLog.all('MoaLog.all');
MoaLog.debug('MoaLog.debug');
MoaLog.info('MoaLog.info');
MoaLog.warn('MoaLog.warn');
MoaLog.error('MoaLog.error');
MoaLog.crit('MoaLog.crit');

MoaLog.log('-------------------------------------------');

MoaLog.console('MoaLog.console');
MoaLog.log('MoaLog.log');

MoaLog.log('-------------------------------------------');

MoaLog.file('origin');
MoaLog.file('sss', 'as');
MoaLog.file('origin');

MoaLog.log('-------------------------------------------');

MoaLog.inspect({key: 'value', key2: 'value2'});
MoaLog.depth({key: 'value', key2: 'value2'});
MoaLog.inspect({k1: {k2: {k3: {k4: {k5: {k6: 'v6'}}}}}});
MoaLog.depth({k1: {k2: {k3: {k4: {k5: {k6: 'v6'}}}}}});
