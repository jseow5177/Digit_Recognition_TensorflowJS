export const submitInput = async (input) => {
  const response = await fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: input
    })
  });
  return await response.json();
}
