import React from 'react';
import { FaHandPaper} from "react-icons/fa";

export default function Error(props) {
  const { response } = props.value;
  const statusText = response ? response.statusText : 'Unknown Error';
  const status = response ? response.status : 'Unknown Status';
  const message = response ? response.data.message : 'Unknown Error Message';

  return (
    <div className="error-outer">
        <div className="error-container">
        <div className="error-heading">
            <p className="status-code">{status}</p>
            <h2 className="status-text">{statusText}</h2>
            <FaHandPaper className="error-icon" />
            <p className="error-message">{message}</p>
        </div>
        
        </div>
    </div>
  );

}
