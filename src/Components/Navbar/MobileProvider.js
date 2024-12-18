// MobileProvider.js
import React, { useState } from "react";
import { MobileContext } from "./Navbar"; // Assuming MobileContext is in another file

export function MobileProvider({ children }) {
  const [mobileClass, setMobileClass] = useState("");

  return (
    <MobileContext.Provider value={{ mobileClass, setMobileClass }}>
      {children}
    </MobileContext.Provider>
  );
}
