# events-emit

single events emitter listener

## Install

```bash
$ npm install events-emit
```

## Usage

```js
function Obj() {
}

// es6
// class Obj {
// }

var Emitter = require('events-emit');

new Emitter(Obj.prototype, {prefix: '$'});

```

## API 

See the [Node.js EventEmitter docs](http://nodejs.org/api/events.html)

## License

[MIT](LICENSE)
