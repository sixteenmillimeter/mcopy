const webSocket = new WebSocket('ws://localhost:{{PORT}}/');
webSocket.onmessage = (event) => {
   const data = JSON.parse(event.data);
   console.log(data);
}