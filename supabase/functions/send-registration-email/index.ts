
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationRequest {
    email: string;
    first_name: string;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { email, first_name }: RegistrationRequest = await req.json();

        if (!email || !first_name) {
            throw new Error("Missing email or first_name");
        }

        console.log(`Sending email to ${email}`);

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "VictorHacks Team <team@victorhacks.com>", // MUST be a verified domain in Resend
                to: [email],
                subject: "Welcome to the Raid! ⚔️ VictorHacks 2026 Registration Confirmed",
                html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; background-color: #0d0d0d; color: #ffffff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 2px solid #fbbf24; border-radius: 8px; overflow: hidden; }
                .header { background-color: #1a1a1a; padding: 20px; text-align: center; border-bottom: 2px solid #fbbf24; }
                .header h1 { color: #fbbf24; text-transform: uppercase; margin: 0; letter-spacing: 2px; }
                .content { padding: 30px; line-height: 1.6; color: #e5e5e5; }
                .btn { display: inline-block; padding: 12px 24px; margin: 10px 5px; background-color: #fbbf24; color: #000000; text-decoration: none; font-weight: bold; text-transform: uppercase; border-radius: 4px; transition: background-color 0.3s; }
                .btn:hover { background-color: #d97706; }
                .btn-secondary { background-color: #333; color: #fbbf24; border: 1px solid #fbbf24; }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #333; }
                .highlight { color: #fbbf24; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>VictorHacks 2026</h1>
                </div>
                <div class="content">
                    <p>Greetings, <span class="highlight">${first_name}</span>!</p>
                    <p>Your spot in the upcoming raid has been secured. The gods smile upon your ambition.</p>
                    <p><strong>Date:</strong> April 12th, 2026<br>
                    <strong>Location:</strong> Northern Kentucky University</p>
                    
                    <p>To prepare for battle, you must join our ranks and equip yourself with the necessary information:</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://discord.com/invite/Q6URhaSz55" class="btn">Join Discord</a>
                        <a href="https://shorturl.at/8oXaN" class="btn btn-secondary">View Devpost</a>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                         <a href="https://victorhacks.com" class="btn btn-secondary">Saga Details (Website)</a>
                    </div>

                    <p>Keep your eyes on the Discord for announcements, team formation events, and workshop schedules.</p>
                    <p>We await your arrival, warrior.</p>
                </div>
                <div class="footer">
                    <p>© 2026 VictorHacks. All rights reserved.</p>
                    <p>Northern Kentucky University</p>
                </div>
            </div>
        </body>
        </html>
        `,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Resend API Error:", data);
            return new Response(JSON.stringify({ error: data }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
};

serve(handler);
