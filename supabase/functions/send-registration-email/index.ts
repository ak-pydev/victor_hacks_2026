
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationRequest {
    email: string;
    first_name: string;
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { email, first_name }: RegistrationRequest = await req.json();

        if (!email || !first_name) {
            console.error("Missing email or first_name");
            throw new Error("Missing email or first_name");
        }

        console.log(`Attempting to send email to ${email}`);

        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set");
            throw new Error("Server misconfiguration: missing API key");
        }

        // Using `Welcome to the War-Band, ${first_name}! 🛡️` as subject
        // and custom HTML body as requested
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Victor Hacks Team <team@victorhacks.com>", // MUST be a verified domain in Resend
                to: [email],
                subject: `Welcome to the War-Band, ${first_name}! 🛡️`,
                html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; background-color: #0d0d0d; color: #e5e5e5; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 2px solid #fbbf24; border-radius: 8px; overflow: hidden; }
                .header { background-color: #1a1a1a; padding: 30px 20px; text-align: center; border-bottom: 2px solid #fbbf24; }
                .header h1 { color: #fbbf24; text-transform: uppercase; margin: 0; letter-spacing: 2px; font-size: 24px; }
                .content { padding: 30px; line-height: 1.6; color: #e5e5e5; }
                .greeting { font-size: 20px; color: #fbbf24; font-weight: bold; margin-bottom: 20px; }
                .btn { display: inline-block; padding: 12px 24px; margin: 10px 5px; background-color: #fbbf24; color: #000000; text-decoration: none; font-weight: bold; text-transform: uppercase; border-radius: 4px; transition: background-color 0.3s; }
                .btn:hover { background-color: #d97706; }
                .highlight { color: #fbbf24; font-weight: bold; }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #333; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Victor Hacks 2026</h1>
                </div>
                <div class="content">
                    <div class="greeting">Hail, Hacker!</div>
                    
                    <p>You have successfully joined the ranks for Victor Hacks. Your journey to the North has begun! We are excited to have you in our Shield Wall.</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <!-- Placeholder for logo if needed inline, though header is usually enough -->
                        <span style="font-size: 64px;">🛡️</span>
                    </div>

                    <h3 style="color: #fbbf24; text-transform: uppercase; margin-top: 30px;">Your Next Steps:</h3>

                    <p>
                        <strong class="highlight">⚔️ Join the Mead Hall (Discord):</strong><br>
                        <a href="https://discord.com/invite/Q6URhaSz55" style="color: #fbbf24;">Click here to join</a> — This is where we plan our raids and share code.
                    </p>

                    <p>
                        <strong class="highlight">📜 Register your Project (Devpost):</strong><br>
                        <a href="https://shorturl.at/8oXaN" style="color: #fbbf24;">Click here to register</a> — Where your name will be carved into the runestones.
                    </p>

                    <p style="margin-top: 30px;">Get your keyboard ready. The voyage begins soon!</p>
                    
                    <p>— The Victor Hacks Jarls</p>
                </div>
                <div class="footer">
                    <p>© 2026 Victor Hacks. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Resend API Error:", JSON.stringify(data));
            return new Response(JSON.stringify({ error: data }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        console.log("Email sent successfully:", JSON.stringify(data));

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Function Error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
