import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
  enabled: true,
  autoSignIn: true,
  requireEmailVerification: true,
  sendResetPassword: async ({ user, url }) => {
    await sendEmail({
      to: user.email,
      subject: "🔐 Réinitialisation de ton mot de passe - SolidariGo",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h2 style="color: #2F855A;">🌱 SolidariGo</h2>
          <p>Bonjour ${user.email},</p>
          <p>Tu as demandé à réinitialiser ton mot de passe. Pas de panique, on est là pour toi 💪</p>
          <p>Clique sur le bouton ci-dessous pour choisir un nouveau mot de passe en toute sécurité :</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="background-color: #2F855A; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Réinitialiser mon mot de passe
            </a>
          </p>
          <p>Ce lien est temporaire et expirera bientôt pour ta sécurité.</p>
          <p>Si tu n'es pas à l’origine de cette demande, tu peux ignorer cet e-mail.</p>
          <hr style="margin: 40px 0;" />
          <p style="font-size: 0.9em; color: #666;">
            Merci de faire partie de la communauté SolidariGo 💚
            <br/>Ensemble, soutenons les projets qui comptent.
          </p>
        </div>
      `,
    });
  }
}
,
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const redirectUrl = `${url}&redirect=${encodeURIComponent("http://localhost:3000/auth/verify-success")}`;
    
      await sendEmail({
        to: user.email,
        subject: "✅ Confirme ton adresse pour rejoindre SolidariGo",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h2 style="text-align: center; color: #16a34a;">🌱 SolidariGo</h2>
            <p>Bonjour <strong>${user.email}</strong>,</p>
            <p>Merci de t'être inscrit sur <strong>SolidariGo</strong>, la plateforme dédiée aux associations solidaires.</p>
            <p>Avant de commencer, merci de vérifier ton adresse email :</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${redirectUrl}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                ✅ Vérifier mon adresse
              </a>
            </div>
    
            <p>Ou copie-colle ce lien dans ton navigateur :</p>
            <p style="word-break: break-all;"><a href="${redirectUrl}">${redirectUrl}</a></p>
    
            <hr style="margin: 32px 0;" />
            <p style="font-size: 12px; color: #64748b;">Si tu n'es pas à l'origine de cette demande, ignore simplement ce message.</p>
          </div>
        `,
      });
    }        
  },
});
