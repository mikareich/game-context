type TListener = (...params: any[]) => void;
interface IEventListeners<EventType> {
  type: EventType;
  listener: TListener;
}
class EventSystem<EventType> {
  private registeredEventListeners: IEventListeners<EventType>[] = [];

  public eventType: string;

  /**
   * Add an event listener for specific events
   */
  on(type: EventType, listener: TListener) {
    this.registeredEventListeners.push({ type, listener });
  }

  /**
   * Triggers an event
   */
  triggerEvent(type: EventType, ...params: any[]) {
    const registeredEventListeners = this.registeredEventListeners.filter(
      (event) => event.type === type
    );
    // call callback functions
    registeredEventListeners.forEach((event) => event.listener(params));
  }
}

export default EventSystem;
