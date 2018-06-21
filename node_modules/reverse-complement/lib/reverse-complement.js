/*
 * reverse-complement
 * https://github.com/bitfan/reverse-complement
 *
 * Copyright (c) 2016 Qiang Wang
 * Licensed under the MIT license.
 */

'use strict';

var match={'a': 'T', 'A': 'T', 't': 'A', 'T': 'A', 'g': 'C', 'G': 'C', 'c': 'G', 'C': 'G'};
module.exports = {
    reverse: function (seq) {
        var o = '';
        for (var i = seq.length - 1; i >= 0; i--) {
            o += seq[i].toUpperCase();
        }
        return o;
    },
    complement: function (seq) {
        var o = '';
        for (var i = 0; i < seq.length; i++) {
            if (match[seq[i]] == undefined) break;
            o += match[seq[i]].toUpperCase();
        }
        return o;
    },
    reverse_complement: function (seq) {
        var o = '';
        for (var i = seq.length - 1; i >= 0; i--) {
            if (match[seq[i]] == undefined) break;
            o += match[seq[i]];
        }
        return o;
    }
};
