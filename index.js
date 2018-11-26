if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

function Emitter(obj, opt) {
  opt = opt || {};
  this.prefix = opt.prefix || '$';
  if (obj) return mixin(obj);
}

function mixin(obj) {
  for (var key in Emitter.prototype) {
    if (Object.prototype.hasOwnProperty.call(Emitter.prototype, key)) {
      obj[ key ] = Emitter.prototype[ key ];
    }
  }
  return obj;
}

Emitter.prototype.on =
  Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    var key = this.prefix + event;
    (this._callbacks[ key ] = this._callbacks[ key ] || []).push(fn);
    return this;
  };

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 === arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks[ this.prefix + event ];
  if (!callbacks) return this;
  if (1 === arguments.length) {
    delete this._callbacks[ this.prefix + event ];
    return this;
  }
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[ i ];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[ this.prefix + event ];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[ i ].apply(this, args);
    }
  }

  return this;
};


Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks[ this.prefix + event ] || [];
};

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};
