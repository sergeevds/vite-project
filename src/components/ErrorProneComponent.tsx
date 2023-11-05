import { useCallback, useState } from 'react';

function ErrorProneComponent() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const throwError = useCallback(() => {
    setShouldThrowError(true);
  }, []);

  if (shouldThrowError) {
    throw new Error('Error thrown from ErrorProneComponent');
  }

  return (
    <div>
      <button style={{ backgroundColor: 'red' }} onClick={throwError}>
        Trigger Error
      </button>
    </div>
  );
}

export default ErrorProneComponent;
