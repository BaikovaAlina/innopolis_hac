export const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};

export const sendData = async (data) => {
  const response = await fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

