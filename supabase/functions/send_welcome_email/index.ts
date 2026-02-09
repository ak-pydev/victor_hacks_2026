import { Resend } from "npm:resend";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    // 1. Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (!RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not set in Supabase Secrets");
        }

        // Initialize the Resend messenger inside the handler
        const resend = new Resend(RESEND_API_KEY);

        // 2. Parse the payload and guard against missing "record"
        const payload = await req.json();

        // Supabase webhooks send data in the "record" object
        const record = payload?.record;
        if (!record) {
            throw new Error("No record found. Are you sure this is a Supabase Webhook?");
        }

        const { email, first_name } = record;

        if (!email) {
            throw new Error("No email found in the database record");
        }

        console.log(`Sending welcome bird to: ${email}`);

        // 3. Send the message
        const { data, error } = await resend.emails.send({
            // Ensure this matches your VERIFIED domain in Resend (e.g., send.victorhacks.com)
            // If you verify 'victorhacks.com' directly, you can use 'team@victorhacks.com'
            // If you verify a subdomain 'send.victorhacks.com', use 'team@send.victorhacks.com'
            from: "Victor Hacks Team <team@team.victorhacks.com>",
            to: [email],
            subject: `Welcome to the War-Band, ${first_name || 'Hacker'}! 🛡️`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.3);">
                            
                            <!-- Banner -->
                            <tr>
                                <td style="position: relative;">
                                    <img src="https://lmklpxjnzhxnlusoxzhl.supabase.co/storage/v1/object/public/images/banner.png" alt="Victor Hacks" width="600" style="width: 100%; height: auto; display: block; border-bottom: 2px solid #fbbf24;">
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="padding: 50px 40px;">
                                    <!-- Greeting -->
                                    <h1 style="color: #fbbf24; font-size: 32px; font-weight: 800; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);">
                                        ⚔️ Hail, ${first_name || 'Hacker'}!
                                    </h1>
                                    
                                    <div style="height: 3px; width: 60px; background: linear-gradient(90deg, #fbbf24 0%, transparent 100%); margin-bottom: 25px;"></div>
                                    
                                    <p style="color: #b8b8b8; font-size: 17px; line-height: 1.7; margin: 0 0 30px 0;">
                                        You have successfully joined the ranks for <strong style="color: #ffffff; font-weight: 700;">Victor Hacks</strong>. Your journey to the North has begun! We are excited to have you in our <span style="color: #fbbf24; font-weight: 600;">Shield Wall</span>.
                                    </p>

                                    <!-- Divider -->
                                    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%); margin: 35px 0;"></div>

                                    <!-- Next Steps Header -->
                                    <h2 style="color: #ffffff; font-size: 16px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 25px 0; font-weight: 700;">
                                        🛡️ Your Next Raid Steps
                                    </h2>

                                    <!-- Discord Card -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 12px; overflow: hidden;">
                                        <tr>
                                            <td style="padding: 25px;">
                                                <div style="color: #fbbf24; font-weight: 700; font-size: 15px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                                                    ⚔️ Join the Mead Hall
                                                </div>
                                                <p style="color: #888; font-size: 13px; margin: 0 0 15px 0; line-height: 1.5;">
                                                    Connect with fellow warriors, share your code, and plan your raids in our Discord community.
                                                </p>
                                                <a href="https://discord.com/invite/Q6URhaSz55" style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000000; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4); transition: all 0.3s;">
                                                    Enter Discord →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Devpost Card -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; overflow: hidden;">
                                        <tr>
                                            <td style="padding: 25px;">
                                                <div style="color: #fbbf24; font-weight: 700; font-size: 15px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                                                    📜 Carve Your Runes
                                                </div>
                                                <p style="color: #888; font-size: 13px; margin: 0 0 15px 0; line-height: 1.5;">
                                                    Register your project on Devpost and ensure your name is etched in the runestones.
                                                </p>
                                                <a href="https://shorturl.at/8oXaN" style="display: inline-block; background: transparent; color: #fbbf24; border: 2px solid #fbbf24; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s;">
                                                    View Devpost →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Quote -->
                                    <div style="margin-top: 40px; padding: 20px; border-left: 3px solid #fbbf24; background: rgba(251, 191, 36, 0.05); border-radius: 0 8px 8px 0;">
                                        <p style="color: #999; font-size: 14px; font-style: italic; margin: 0; line-height: 1.6;">
                                            "Cattle die, kinsmen die, you yourself will die; but I know one thing that never dies — the reputation we leave behind."
                                        </p>
                                        <p style="color: #fbbf24; font-size: 13px; font-weight: 700; margin: 10px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">
                                            — The Victor Hacks Jarls
                                        </p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%); padding: 30px 40px; border-top: 1px solid rgba(251, 191, 36, 0.2);">
                                    <p style="color: #555; font-size: 11px; text-align: center; margin: 0; text-transform: uppercase; letter-spacing: 2px; line-height: 1.6;">
                                        Northern Kentucky University<br>
                                        <span style="color: #fbbf24;">•</span> Data Science Club <span style="color: #fbbf24;">•</span> GDG
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
        });

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("The voyage failed:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
