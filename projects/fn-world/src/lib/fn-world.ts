export class FnWorld {
  if(condition: any, trueFn: any, falseFn?: any): any {
    return (typeof condition === 'function' ? condition() : condition)
      ? (trueFn && typeof trueFn === 'function' ? trueFn() : trueFn)
      : (falseFn && typeof falseFn === 'function' ? falseFn() : falseFn);
  }
}
