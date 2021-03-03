type EventListener = (...params: any[]) => void;
interface IEventListeners<EventType> {
  type: EventType;
  listener: EventListener;
}
class EventSystem<EventType> {
  private registeredEventListeners: IEventListeners<EventType>[] = [];

  public eventType: string;

  /**
   * Add an event listener for specific events.
   * @param type Type of event to be listen to.
   * @param listener Function to execute when event is triggerd.
   */
  public on(type: EventType, listener: EventListener) {
    this.registeredEventListeners.push({ type, listener });
  }

  /**
   * Triggers an event.
   * @param type Type of event to trigger.
   * @param params Additional parameters to pass to the listener.
   */
  public triggerEvent(type: EventType, ...params: any[]) {
    const registeredEventListeners = this.registeredEventListeners.filter(
      (event) => event.type === type
    );
    // call callback functions
    registeredEventListeners.forEach((event) => event.listener(params));
  }
}

export default EventSystem;
