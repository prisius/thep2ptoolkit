// WebRTCContext.tsx
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Artico } from '@rtco/client';

const WebRTCContext = createContext(null);

export const WebRTCProvider = ({ children }) => {
  const rtcoRef = useRef(null);

  // Initialise Artico une seule fois
  if (!rtcoRef.current) {
    rtcoRef.current = new Artico();
  }

  return (
    <WebRTCContext.Provider value={rtcoRef.current}>
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTC = () => useContext(WebRTCContext);
