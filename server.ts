import express from 'express';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Chatbot Endpoint Configuration
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

const SYSTEM_INSTRUCTION = `You are the premium AI assistant for 'مطعم رضا الله' (Reda Allah Restaurant), a high-end Moroccan barbecue restaurant in Kénitra, Morocco.
Your tone should be luxurious, extremely polite, welcoming, and professional. 
You speak preferably in Arabic (Darija or MSA) but can answer in French or English if the user prefers.
Our location: Kénitra, Morocco. Phone: +212 696 65 70 33. Rating: 4.0/5.
We offer premium Mix Grill, Chicken BBQ, Kefta, Sandwiches, Family Meals, and more.
You help customers understand the menu, make reservations, or guide them on how to order via WhatsApp. 
Always recommend the signature "Mix Grill" if they ask for a recommendation.`;

app.post('/api/chat', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));
    
    const userMessage = messages[messages.length - 1]?.content;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'User message is missing.' });
    }

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
             systemInstruction: SYSTEM_INSTRUCTION,
        }
    });
    
    // It's a bit complex to restore history with @google/genai by passing the history directly to chat creation, 
    // Wait, let's just send the whole thing as a single conversation or use the straightforward generateContent
    
    const promptParts = [{ text: SYSTEM_INSTRUCTION }];
    for (const msg of messages) {
       promptParts.push({ text: `\n${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}` });
    }
    promptParts.push({text: "\nAssistant: "});

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptParts,
    });

    res.json({ text: response.text });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
});


async function createServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const root = process.cwd();
  
  if (isProd) {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    
    app.use('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  } else {
    // In development, use Vite's internal middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

createServer();
