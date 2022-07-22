export class TradeSocket {
  constructor(url, notification) {
    this.url = url;
    this.socket = null;
    this.notification = notification;
    this.error = null;
    this.data = [];
    this.isInitiated = false;
  }

  init(symbol, oldSymbol) {
    if (oldSymbol && this.socket) this.unsubscribe(oldSymbol);

    this.socket = new WebSocket(this.url);
    this.open(symbol);
    this.listen();
  }

  open(symbol) {
    console.log("Opening socket for ", symbol);
    this.socket.addEventListener("open", (event) => {
      console.log("Socket opened: ", event);
      this.isInitiated = true;
      this.socket.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
    });
  }

  listen() {
    // Listen for messages
    this.socket.addEventListener("message", (event) => {
      // console.log("Socket message: ", event.data);
      const eventData = JSON.parse(event.data);
      if (eventData.type === "error") {
        this.error = eventData.msg;
        this.notification(this.error, { type: "danger" });
        return;
      }
      if (this.error) this.error = null;
      if (eventData.data?.length) this.data = [...this.data, ...eventData.data];
    });
  }

  unsubscribe(symbol) {
    this.data = [];
    this.socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  }

  get price() {
    // return last p in data
    return this.data[this.data.length - 1]?.p || null;
  }
}
