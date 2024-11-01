import React, { useState, useEffect, useRef } from 'react';
import { Artico } from '@rtco/client';
import  {useStore}  from "./zus.ts";

function Chat() {
  const [remoteID, setRemoteID] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [id, setId] = useState(""); 
  const peerId = useStore(state => state.peerId);
const setPeerId = useStore((state) => state.setPeerId); // Assurez-vous que l'import est correct
const rtco = useStore(state => state.rtco);
const setRtco = useStore(state => state.setRtco)
  
  const rtcoRef = useRef(null); 
  const callRef = useRef(null);




useEffect(() => {
  if (!rtcoRef.current) {
    const rtco = new Artico();
    rtcoRef.current = rtco;
    setRtco(rtco); // Enregistre l'instance dans le store zustand

    rtco.on('open', (id) => {
      if (!peerId) {
        setPeerId(id);
      }
    });

    // Événements pour l'appel
    rtco.on('call', (call) => {
      call.answer();
      call.on('open', () => setConnected(true));
      call.on('data', (data) => setMessages((prev) => [...prev, `Peer 1: ${data}`]));
      callRef.current = call;
    });
  }
}, [setPeerId, setRtco, peerId]);

  const connectToPeer = () => {
    const rtco = rtcoRef.current;
    const call = rtco.call(remoteID, { username: 'Peer1' });
    call.on('open', () => setConnected(true));
    call.on('data', (data) => setMessages((prev) => [...prev, `Peer 2: ${data}`]));
    call.on('close', () => setConnected(false));
    callRef.current = call;
  };

  const sendMessage = () => {
    if (callRef.current && inputMessage.trim()) {
      callRef.current.send(inputMessage);
      setMessages((prev) => [...prev, `Me: ${inputMessage}`]);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>WebRTC Chat</h2>

      <p>Your Peer ID: <strong>{peerId || "Connecting..."}</strong></p>

      {!connected && (
        <div>
          <input
            type="text"
            placeholder="Enter Remote Peer ID"
            value={remoteID}
            onChange={(e) => setRemoteID(e.target.value)}
          />
          <button onClick={connectToPeer}>Connect to Peer</button>
        </div>
      )}

      {connected ? <p>Connected!</p> : <p>Not connected</p>}

      <div>
        <h3>Messages</h3>
        <div style={{ border: '1px solid black', padding: '10px', minHeight: '100px' }}>
          {messages.length > 0 ? (
            messages.map((msg, index) => <p key={index}>{msg}</p>)
          ) : (
            <p>No messages yet...</p>
          )}
        </div>
      </div>

      {connected && (
        <div>
          <input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Chat;
