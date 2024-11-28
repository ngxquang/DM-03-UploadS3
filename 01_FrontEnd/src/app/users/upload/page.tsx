'use client'


import { useState } from 'react';

const UploadUser = () => {
  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/users/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('User created:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          File:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            required
          />
        </label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadUser;
