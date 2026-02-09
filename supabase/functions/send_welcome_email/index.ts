import { Resend } from "npm:resend";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

        const resend = new Resend(RESEND_API_KEY);
        const payload = await req.json();
        const record = payload?.record;
        
        if (!record) throw new Error("No record found in Supabase Webhook payload.");
        const { email, first_name } = record;

        const { data, error } = await resend.emails.send({
            from: "Victor Hacks Team <team@send.victorhacks.com>",
            to: [email],
            subject: `Welcome to the War-Band, ${first_name || 'Hacker'}! 🛡️`,
            html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#050505">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f0f0f; border: 1px solid #222; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            
                            <tr>
                                <td>
                                    <img src="https://lmklpxjnzhxnlusoxzhl.supabase.co/storage/v1/object/public/images/banner.png" alt="Victor Hacks Banner" width="600" style="display: block; width: 100%; height: auto;">
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 40px; text-align: left;">
                                    <h1 style="color: #fbbf24; font-size: 28px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px;">
                                        Hail, ${first_name || 'Hacker'}!
                                    </h1>
                                    
                                    <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        You have successfully joined the ranks for <strong style="color: #ffffff;">Victor Hacks</strong>. Your journey to the North has begun! We are excited to have you in our Shield Wall.
                                    </p>

                                    <div style="height: 1px; background-color: #222; margin-bottom: 30px;"></div>

                                    <h3 style="color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">The Next Raid Steps:</h3>

                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="padding-bottom: 25px;">
                                                <div style="color: #fbbf24; font-weight: bold; font-size: 14px; margin-bottom: 8px;">⚔️ JOIN THE MEAD HALL</div>
                                                <a href="https://discord.com/invite/Q6URhaSz55" style="display: inline-block; background-color: #fbbf24; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">ENTER DISCORD</a>
                                                <div style="color: #525252; font-size: 12px; margin-top: 5px;">Plan your raids and share code here.</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 10px;">
                                                <div style="color: #fbbf24; font-weight: bold; font-size: 14px; margin-bottom: 8px;">📜 CARVE YOUR RUNES</div>
                                                <a href="https://shorturl.at/8oXaN" style="display: inline-block; background-color: transparent; color: #fbbf24; border: 1px solid #fbbf24; padding: 11px 23px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">REGISTER ON DEVPOST</a>
                                                <div style="color: #525252; font-size: 12px; margin-top: 5px;">Ensure your name is in the runestones.</div>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="color: #666; font-size: 14px; margin-top: 40px; font-style: italic; border-left: 2px solid #fbbf24; padding-left: 15px;">
                                        "A traveler should be wise, for anything is easy at home." <br>
                                        <span style="color: #fbbf24; font-style: normal; font-weight: bold;">— The Victor Hacks Jarls</span>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="background-color: #0a0a0a; padding: 20px; border-top: 1px solid #1a1a1a;">
                                    <p style="color: #444; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
                                        Northern Kentucky University • Data Science Club • GDG
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

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } catch (error) {
        console.error("The voyage failed:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
});