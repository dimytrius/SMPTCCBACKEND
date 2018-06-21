'use strict';

var reverse_complement = require('../lib/reverse-complement.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['reverse'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(3);
    // tests here
    test.equal(reverse_complement.reverse('ATGTCT'), 'TCTGTA', 'ATGTCT reversed should be TCTGTA.');
    test.equal(reverse_complement.reverse('aaGTCT'), 'TCTGAA', 'aaGTCT reversed should be TCTGAA.');
    test.equal(reverse_complement.reverse('aaTTGCGC'), 'CGCGTTAA', 'aaTTGCGC reversed should be CGCGTTAA.');
    test.done();
  },
};

exports['complement'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(4);
    // tests here
    test.equal(reverse_complement.complement('ATGTCT'), 'TACAGA', 'TACAGA complemented should be TACAGA.');
    test.equal(reverse_complement.complement('aaGTCT'), 'TTCAGA', 'aaGTCT complemented should be TTCAGA.');
    test.equal(reverse_complement.complement('aattcgcg'), 'TTAAGCGC', 'aattcgcg complemented should be TTAAGCGC.');
    test.equal(reverse_complement.complement('atttacggatagcasdfasdfcta'), 'TAAATGCCTATCGT', 'atttacggatagcasdfasdfcta complemented should be TAAATGCCTATCGT.');
    test.done();
  },
};

exports['reverse_complement'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(4);
    // tests here
    test.equal(reverse_complement.reverse_complement('ATGTCT'), 'AGACAT', 'TACAGA reverse complement should be AGACAT.');
    test.equal(reverse_complement.reverse_complement('aaGTCT'), 'AGACTT', 'aaGTCT reverse complement should be AGACTT.');
    test.equal(reverse_complement.reverse_complement('aattcgcg'), 'CGCGAATT', 'aattcgcg complemented should be CGCGAATT.');
    test.equal(reverse_complement.reverse_complement('atttacggatagcasdfasdfcta'), 'TAG', 'atttacggatagcasdfasdfcta complemented should be TAG.');
    test.done();
  },
};
