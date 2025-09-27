import React from "react";

function App() {
  return (
    <div style={{padding: '20px', fontSize: '24px', fontFamily: 'Arial'}}>
      <h1>Hello World - Deployment Test</h1>
      <p>If you can see this, the deployment is working!</p>
      <p>Environment: {import.meta.env.MODE}</p>
    </div>
  );
}

export default App;