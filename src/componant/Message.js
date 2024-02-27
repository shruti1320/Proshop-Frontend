import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 1500); // Adjust the time here (in milliseconds) for how long you want the message to be shown

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showMessage && (
        <Alert variant={variant}>
          {children}
        </Alert>
      )}
    </>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
