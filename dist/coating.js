"use strict";
const symbol = Symbol('coating');
function coating(func, thisArg = null) {
    return internalCoating(func, thisArg, null);
}
function internalCoating(func, thisArg, args) {
    if (!func) {
        throw new Error('Argument "func" is null.');
    }
    if (func.length == 0 ||
        Object.getOwnPropertySymbols(func).indexOf(symbol) != -1) {
        if (thisArg)
            return func.bind(thisArg);
        return func;
    }
    let r = function () {
        let required = this.origin.length - this.args.length;
        let args = [];
        for (let i = 0; i < this.args.length; i++) {
            args[i] = this.args[i];
        }
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if (required > arguments.length) {
            return internalCoating(this.origin, this.me, args);
        }
        return this.origin.apply(this.me, args);
    };
    r[symbol] = true;
    r.args = args || [];
    r.me = thisArg;
    r.origin = func;
    return r.bind(r);
}
module.exports = coating;
//# sourceMappingURL=coating.js.map