export const fetchEvents = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await response.json();
  return data;
};

export const submitFeedback = async (feedback) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedback),
  });
  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }
  return response.json();
};

export const initiatePayment = async (eventId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eventId }),
  });
  if (!response.ok) {
    throw new Error('Failed to initiate payment');
  }
  return response.json();
}; 