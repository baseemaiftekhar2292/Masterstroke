const handleAsk = async () => {
  if (!inputQuestion.trim()) return;
  setLoading(true);
  
  try {
    const res = await fetch('/api/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: inputQuestion }),
    });
    
    const data = await res.json();
    setAiResponse(data.answer || "Error fetching response.");
  } catch (err) {
    setAiResponse("Backend connection failed.");
  } finally {
    setLoading(false);
  }
};
