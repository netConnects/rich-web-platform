export class FnWorld {
    static if = (condition: any, trueFn: any, falseFn?: any): any =>
         (typeof condition === 'function' ? condition() : condition)
            ? (trueFn && typeof trueFn === 'function' ? trueFn() : trueFn)
            : (falseFn && typeof falseFn === 'function' ? falseFn() : falseFn)
}
