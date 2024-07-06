import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback() {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Our team has been notified and we are working on fixing the issue</p>
    </div>
  );
}

function ErrorBoundaryProvider({ children }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}

export default ErrorBoundaryProvider;
