import { useRouteError } from 'react-router-dom';

const ErrorDisplay = () => {
  const err = useRouteError();
  console.error(err);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '1rem',
        boxSizing: 'border-box',
        paddingTop: '200px',
        overflow: 'hidden',
      }}
    >
      <h1
        style={{
          color: '#ff4c4c',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          marginBottom: '1rem',
        }}
      >
        Uh oh!
      </h1>
      <p
        style={{
          color: '#ff4c4c',
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        Something went wrong.
      </p>
      {err && (
        <>
          <p
            style={{
              color: '#ff4c4c',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            <strong>{err.status && `${err.status} - ${err.statusText}`}</strong>
          </p>
          <p
            style={{
              color: '#ff4c4c',
              fontSize: '1.25rem',
              marginBottom: '1rem',
            }}
          >
            {err.message}
          </p>
          <pre
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'left',
              width: '70%',
              minHeight: '65vh',
              overflowY: 'auto',
              fontSize: '0.875rem',
              color: '#d1d5db',
              backgroundColor: 'transparent',
            }}
          >
            {err?.error?.stack || err.stack}
          </pre>
        </>
      )}
    </div>
  );
};

export default ErrorDisplay;
