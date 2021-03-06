(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.hookFactory = factory());
}(this, (function () { 'use strict';

    function HookFactory({
        data = {},
        modifiers = []
    }) {
        let props = JSON.parse(JSON.stringify(data));
        const prehooks = modifiers.reduce((result, modifier) => {
            if (modifier.prehook) {
                result.push(modifier.prehook);
            }
            return result;
        }, []);
        const posthooks = modifiers.reduce((result, modifier) => {
            if (modifier.posthook) {
                result.push(modifier.posthook);
            }
            return result;
        }, []);

        if (prehooks) {
            prehooks.forEach(prehook => (props = prehook(props)));
        }
        if (posthooks) {
            posthooks.forEach(posthook => (props = posthook(props)));
        }
        return props;
    }

    return HookFactory;

})));
