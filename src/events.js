/**
 * Shared application event bus based on standard EventTarget and CustomEvent.
 */
export function createBus() {
  const target = new EventTarget();
  return {
    target,
    emit(type, detail = {}) {
      target.dispatchEvent(new CustomEvent(type, { detail }));
    },
    on(type, handler, options) {
      const wrapped = (event) => handler(event.detail, event);
      target.addEventListener(type, wrapped, options);
      return () => target.removeEventListener(type, wrapped, options);
    },
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
  };
}

export const bus = createBus();
export default bus;
