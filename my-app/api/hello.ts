// api/hello.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async (req: VercelRequest, res: VercelResponse) => {
    if (req.method === 'POST') {

        try {
            const data = req.body;
            const { text, web_hook_url } = JSON.parse(data);

            await axios.post(web_hook_url, { text });

            res.status(200).json({ success: true, message: "Sent to Slack!" });
        } catch (error) {
            console.error("Error sending to Slack:", error);
            res.status(500).json({ success: false, error: "Failed to send message" });
        }
    } else {
        // Handle other methods (GET, etc.)
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
