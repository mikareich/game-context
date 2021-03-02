type TListener = (...params: any[]) => void;
interface IEventListeners {
  type: string;
  listener: TListener;
}
class EventSystem {
  private registeredEventListeners: IEventListeners[];

  private eventTypes: string[];

  /**
   * Add an event listener for specific events
   */
  on(type: string, listener: TListener) {
    this.registeredEventListeners.push({ type, listener });
  }

  /**
   * Triggers an event
   */
  triggerEvent(type: string, ...params: any[]) {
    const registeredEventListeners = this.registeredEventListeners.filter(
      (event) => event.type === type
    );
    // call callback functions
    registeredEventListeners.forEach((event) => event.listener(params));
  }
}

export default EventSystem;
