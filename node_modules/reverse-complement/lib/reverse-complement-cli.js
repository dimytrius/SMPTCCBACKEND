#! /usr/bin/env node
/**
 * Created by Charles on 4/12/16.
 */
'use strict';

var reverse_complement = require('../lib/reverse-complement.js');

if(process.argv != undefined) {
    var help_msg = "Usage:\n    reverse-conplement [options] <DNA-sequence>\nOptions:\n    -h    print help message\n    -r    reverse the sequence\n    -c    complement the sequence\n    -l    to lower case\n    -u    to upper case (default)\n";
    if (process.argv.length < 3) {
        console.log(help_msg);
    } else if (process.argv.length == 3) {
        if (process.argv[2].startsWith('-h')) {
            console.log(help_msg);
        } else {
            console.log(reverse_complement.reverse_complement(process.argv[2]));
        }
    } else {
        var seq = '', f;
        var upper = true;
        for (var i = 2; i < process.argv.length; i++) {
            if (process.argv[i].startsWith('-c')) {
                f = reverse_complement.complement;
            } else if (process.argv[i].startsWith('-r')) {
                f = reverse_complement.reverse;
            } else if (process.argv[i].startsWith('-l')) {
                upper = false;
            } else if (process.argv[i].startsWith('-u')) {
                upper = true;
            } else {
                if (!process.argv[i].startsWith('-')) {
                    seq += process.argv[i];
                } else {
                    console.log("ERROR: Wrong option!!!");
                    console.log(help_msg);
                }
            }
        }
        if (seq.length == 0) {
            console.log(help_msg);
        } else {
            var ret;
            if (f == undefined) {
                ret = reverse_complement.reverse_complement(seq);
            } else {
                ret = f(seq);
            }
            if(upper) {
                console.log(ret);
            } else {
                console.log(ret.toLowerCase());
            }
        }
    }
}
