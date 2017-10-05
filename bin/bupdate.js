#!/usr/bin/env node

'use strict';

const argv  = process.argv.slice(2);
const args = require('yargs-parser')(argv, {
    boolean: [
        'version',
        'help',
        'save-exact'
    ],
    alias: {
        'v': 'version',
        'h': 'help',
        'E': 'save-exact'
    }
});

if (!argv.length || args.help)
    return help();
else if (args.version)
    return version();

const {saveExact} = args;

args._.forEach((name) => {
    bupdate(name, {saveExact});
});

function bupdate(name, {saveExact}) {
    var bower = require('bower');
    var async = require('async');
    
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
                .install([name], {
                    save: true,
                    saveExact: saveExact
                })
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
    var bin = require('../json/bin');
    var usage = 'Usage: bupdate [options]';
    
    console.log(usage);
    console.log('Options:');
    
    Object.keys(bin).forEach(function(name) {
        console.log('  %s %s', name, bin[name]);
    });
}

function version() {
    console.log('v' + require('../package').version);
}

