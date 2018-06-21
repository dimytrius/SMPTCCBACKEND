# reverse-complement [![Build Status](https://secure.travis-ci.org/bitfan/reverse-complement.png?branch=master)](http://travis-ci.org/bitfan/reverse-complement)

```reverse-complement``` is a Node.js based tool to convert a DNA sequence into its reverse, complement, or reverse-complement counterpart.

## Getting Started
Install the module with: `npm install reverse-complement`

```javascript
var rc = require('reverse-complement');

var sequence = 'GAATTCGAT';

rc.reverse(sequence); // "TAGCTTAAG"
rc.complement(sequence); // "CTTAAGCTA"
rc.reverse_complement(sequence); // "ATCGAATTC"
```
Or you can just run it in command line mode:

```bash
reverse-complement -h
reverse-complement GAATTCGAT
reverse-complement -r GAATTCGAT
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Version|Comments
---|---
0.1.0|Initial version.


## License
Copyright (c) 2016 [Qiang Wang](http://chancewang.com)  
Licensed under the MIT license.


