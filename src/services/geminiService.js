const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const getAIRecommendations = async (userPrompt, products) => {
  if (!userPrompt.trim()) {
    throw new Error("Please enter your shopping needs.");
  }

  if (!products.length) {
    throw new Error("No products available.");
  }

  if (!API_KEY) {
    throw new Error("Gemini API key is missing.");
  }

  const productData = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    rating: product.rating,
    stock: product.stock,
  }));

  const prompt = `
You are a shopping assistant for SmartShop.

Customer needs:
${userPrompt}

Available products:
${JSON.stringify(productData)}

Recommend up to 3 suitable products from the list.

Rules:
- Only recommend products from the provided list.
- Do not invent products.
- Explain why each product matches the customer's needs.
- Respond in Vietnamese.
- Return ONLY a JSON object in this format:

{
  "recommendations": [
    {
      "id": 1,
      "reason": "Reason for recommending this product"
    }
  ]
}
`;

  const response = await fetch(
    
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini API request failed.");
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const result = JSON.parse(text);

  if (!Array.isArray(result.recommendations)) {
    throw new Error("Invalid AI response.");
  }

  // Chỉ lấy sản phẩm thực sự có trong danh sách
  return result.recommendations
    .slice(0, 3)
    .map((item) => {
      const product = products.find((p) => p.id === Number(item.id));

      if (!product) return null;

      return {
        ...product,
        reason: item.reason,
      };
    })
    .filter(Boolean);
};
