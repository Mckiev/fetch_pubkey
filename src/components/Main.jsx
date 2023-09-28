import React, { useState } from 'react';
import FetchButton from './fetchButton';
import Upload from './Upload';

export default function Main() {
  const [recipients, setRecipients] = useState([{ id: 1, address: '', pubkey: '' }]);

  const addRecipient = () => {
    const newRecipient = { id: recipients.length + 1, address: '', pubkey: '' };
    setRecipients([...recipients, newRecipient]);
  };

  const deleteRecipient = (id) => {
    const newRecipients = recipients.filter((recipient) => recipient.id !== id);
    setRecipients(newRecipients);
  };

  return (
    <main>
      <h1 className="main--title">List of recipients</h1>
      <ol className="recipients" id="recipientsList">
        {recipients.map((recipient, index) => (
          <li key={recipient.id}>
            <div>
              <input type="text" className="wallet--address" placeholder="0x..." />
              <input type="text" className="wallet--pubkey" placeholder="Pubkey..." />
              <button onClick={() => deleteRecipient(recipient.id)}>Delete recipient</button>
            </div>
          </li>
        ))}
      </ol>
      <button onClick={addRecipient}>Add Recipient</button>
      <FetchButton />
      {/* <Upload /> */}
    </main>
  );
}
