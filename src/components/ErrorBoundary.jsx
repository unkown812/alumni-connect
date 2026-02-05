// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // you can also log to a remote service here
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, color: "#900", background: "#fff7f7", borderRadius: 6 }}>
          <h3>Something went wrong rendering this section</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
          <details style={{ whiteSpace: "pre-wrap" }}>{this.state.info?.componentStack}</details>
        </div>
      );
    }
    return this.props.children;
  }
}
