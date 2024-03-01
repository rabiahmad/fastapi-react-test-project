import React from "react";

const DocsComponent = () => {
  return (
    <div>
      <h1>API Documentation</h1>
      <iframe
        src="/docs" // Assuming your API documentation is served from /docs
        title="API Documentation"
        style={{ width: "100%", height: "800px", border: "none" }}
      ></iframe>
    </div>
  );
};

export default DocsComponent;
