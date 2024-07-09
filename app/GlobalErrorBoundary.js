// GlobalErrorBoundary.js
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  // Handle the error here, e.g., log it
  console.error(error);

  // You can render a fallback UI here
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

export default GlobalErrorBoundary;
