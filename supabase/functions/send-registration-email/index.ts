import { Resend } from "npm:resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // IMPORTANT: Supabase Webhooks wrap the data in a "record" object
        const payload = await req.json();
        const { email, first_name } = payload.record;

        if (!email) {
            throw new Error("No email found in the webhook record");
        }

        if (!RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not set in Supabase Secrets");
        }

        const data = await resend.emails.send({
            // Ensure this matches your VERIFIED domain in Resend (e.g., send.victorhacks.com)
            from: "Victor Hacks Team <team@send.victorhacks.com>",
            to: [email],
            subject: `Welcome to the War-Band, ${first_name || 'Hacker'}! 🛡️`,
            html: `
        <div style="font-family: sans-serif; background-color: #0d0d0d; color: #e5e5e5; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 2px solid #fbbf24; border-radius: 8px; overflow: hidden;">
                <div style="text-align: center; background-color: #1a1a1a;">
                    <img src="https://lmklpxjnzhxnlusoxzhl.supabase.co/storage/v1/object/public/images/banner.png" alt="Victor Hacks" style="width: 100%; height: auto; display: block;">
                </div>
                <div style="padding: 30px; line-height: 1.6;">
                    <h2 style="color: #fbbf24; margin-top: 0;">Hail, ${first_name || 'Hacker'}!</h2>
                    
                    <p>You have successfully joined the ranks for <strong>Victor Hacks</strong>. Your journey to the North has begun! We are excited to have you in our Shield Wall.</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <img src="https://lmklpxjnzhxnlusoxzhl.supabase.co/storage/v1/object/public/images/logo_victor_hack.jpeg" alt="Logo" style="width: 120px; height: auto; border-radius: 50%; border: 3px solid #fbbf24;">
                    </div>

                    <h3 style="color: #fbbf24; text-transform: uppercase;">Your Next Steps:</h3>

                    <p style="margin-bottom: 20px;">
                        <strong style="color: #fbbf24;">⚔️ Join the Mead Hall (Discord):</strong><br>
                        <a href="https://discord.com/invite/Q6URhaSz55" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #fbbf24; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px;">JOIN DISCORD</a>
                    </p>

                    <p>
                        <strong style="color: #fbbf24;">📜 Register your Project (Devpost):</strong><br>
                        <a href="https://shorturl.at/8oXaN" style="display: inline-block; margin-top: 10px; padding: 10px 20px; border: 1px solid #fbbf24; color: #fbbf24; text-decoration: none; font-weight: bold; border-radius: 4px;">REGISTER ON DEVPOST</a>
                    </p>

                    <p style="margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">Get your keyboard ready. The voyage begins soon!<br><strong>— The Victor Hacks Jarls</strong></p>
                </div>
            </div>
        </div>
        `,
        });

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});