#!/usr/bin/env node

(function() {
    'use strict';
    
    var argv    = process.argv.slice(2),
        option  = argv[0];
    
    if (!option || /^(-h|--help)$/.test(option))
        help();
    
    else if (/^(-v|--version)$/.test(option))
        version();
    
    else 
        bupdate(option);
        
    function bupdate(name) {
        var bower   = require('bower'),
            async   = require('async');
        
        async.waterfall([
            function uninstall(callback) {
                bower.commands
                    .uninstall([name], { save: true })
                    .on('error', callback)
                    .on('end', function(data) {
                        callback(null, data);
                    });
            },
            
            function logUninstall(data, callback) {
                callback();
            },
            
            function install(callback) {
                bower.commands
                    .install([name], { save: true })
                    .on('error', callback)
                    .on('end', function(data) {
                        callback(null, data);
                    });
            },
            
            function logInstall(data, callback) {
                console.log(name, 'v' + data[name].pkgMeta.version);
                callback();
            },
        ], function(e) {
            if (e)
                console.error(e.message);
        });
    }
        
    function help() {
        var bin         = require('../json/bin'),
            usage       = 'Usage: bupdate [options]';
        
        console.log(usage);
        console.log('Options:');
        
        Object.keys(bin).forEach(function(name) {
            console.log('  %s %s', name, bin[name]);
        });
    }
    
    function version() {
        console.log('v' + require('../package'));
    }
})();