import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend";
import { db } from "@/server/db";
import { env } from "@/env";
import { Polar } from "@polar-sh/sdk";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";



const resend = new Resend(env.RESEND_API_KEY);

const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
});

// Build trusted origins list dynamically
const trustedOrigins = [
    "http://localhost:3000",
    env.BETTER_AUTH_URL,
    // Custom domain
    "https://music-gen.mohitmadnani.co.uk",
];

// Add Vercel deployment URL if available (for preview deployments)
if (process.env.VERCEL_URL) {
    trustedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

export const auth = betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins,
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: "Music Generator <noreply@yourdomain.com>",
                to: user.email,
                subject: "Reset your password",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #7c3aed;">Reset Your Password</h2>
                        <p>Hi${user.name ? ` ${user.name}` : ""},</p>
                        <p>You requested to reset your password. Click the button below to set a new password:</p>
                        <a href="${url}" style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
                            Reset Password
                        </a>
                        <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
                        <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
                    </div>
                `,
            });
        },
    },
    socialProviders: {
        ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
            ? {
                  github: {
                      clientId: env.GITHUB_CLIENT_ID,
                      clientSecret: env.GITHUB_CLIENT_SECRET,
                  },
              }
            : {}),
        ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
            ? {
                  google: {
                      clientId: env.GOOGLE_CLIENT_ID,
                      clientSecret: env.GOOGLE_CLIENT_SECRET,
                  },
              }
            : {}),
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "5cb25676-f9b0-4a41-bde4-62676dc914a0", 
                            slug: "minimum" 
                        },
                        {
                            productId: "64100751-e90b-4b9b-a1ad-60be78a5fb38", 
                            slug: "medium" 
                        },
                        {
                            productId: "f63eba76-7bd3-4f09-9581-2c190bbddde3", 
                            slug: "maximum" 
                        },
                    ],
                    successUrl: "/",
                    authenticatedUsersOnly: true
                }),
                portal(),
                usage(),
                webhooks({
                    secret: env.POLAR_WEBHOOK_SECRET,
                    onOrderPaid: async (order) => {
                        const externalCustomerId = order.data.customer.externalId

                        if (!externalCustomerId) {
                            console.error("No external customer ID found.");
                            throw new Error("No external customer ID found.");
                        }
                        const productId = order.data.productId;
                        let creditsToAdd = 0

                        switch(productId){
                            case "5cb25676-f9b0-4a41-bde4-62676dc914a0":
                                creditsToAdd = 10;
                                break;
                            case "64100751-e90b-4b9b-a1ad-60be78a5fb38":
                                creditsToAdd = 25;
                                break;
                            case "f63eba76-7bd3-4f09-9581-2c190bbddde3":
                                creditsToAdd = 50;
                                break;
                        }

                        await db.user.update({
                            where: {id: externalCustomerId},
                            data: {
                                credits: {
                                    increment: creditsToAdd
                                }
                            }
                        })
                            
                        
                    }

                })
            ],
        })
    ]
});