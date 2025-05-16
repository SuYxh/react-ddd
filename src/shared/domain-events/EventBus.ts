export type DomainEvent = {
  type: string;
  payload: any;
};

const subscribers: { [eventType: string]: ((payload: any) => void)[] } = {};

export const EventBus = {
  publish(event: DomainEvent) {
    (subscribers[event.type] || []).forEach((handler) => handler(event.payload));
  },
  subscribe(eventType: string, handler: (payload: any) => void) {
    if (!subscribers[eventType]) {
      subscribers[eventType] = [];
    }
    subscribers[eventType].push(handler);
  },
};