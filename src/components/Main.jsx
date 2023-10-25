import React, { useState } from 'react';
import FetchButton from '/FetchButton';

export default function Main() {
  const [recipients, setRecipients] = useState([{ id: 1, address: '', pubkey: '' }]);

  const addRecipient = () => {
    const newRecipient = { id: recipients.length + 1, address: '', pubkey: '' };
    setRecipients([...recipients, newRecipient]);
  };

  const deleteLastRecipient = () => {
    setRecipients(recipients.slice(0, -1));
  };

  const downloadJSON = () => {
    const pairs = recipients.map(r => ({
      ethAddress: r.address,
      publicKey: r.pubkey
    }));
    const jsonData = JSON.stringify({ pairs }, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'keys.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const updateRecipient = (id, address, pubkey) => {
    setRecipients(prevRecipients =>
      prevRecipients.map(rec =>
        rec.id === id ? { ...rec, address, pubkey } : rec
      )
    );
  };

  return (
    <main>
      <h1 className="main--title">List of recipients</h1>
      <ol className="recipients" id="recipientsList">
        {recipients.map((recipient, index) => (
          <li key={recipient.id}>
            <FetchButton recipient={recipient} updateRecipient={updateRecipient} />
          </li>
        ))}
      </ol>
      <div className="button-container">
        <button onClick={addRecipient}>Add Wallet</button>
        <button onClick={deleteLastRecipient}>Delete Wallet</button>
      </div>
      <button className="json-button" onClick={downloadJSON}>Download JSON</button>
    </main>
  );
}
