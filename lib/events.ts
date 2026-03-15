export const EVENTS = {
  cartUpdated: 'safetrade:cart-updated',
  notificationsUpdated: 'safetrade:notifications-updated'
};

export function emitCartUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(EVENTS.cartUpdated));
}

export function emitNotificationsUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(EVENTS.notificationsUpdated));
}
