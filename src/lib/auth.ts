import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";


// const prisma = new PrismaClient();

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
        subject: "🔐 Réinitialisation de votre mot de passe",
        html: `
          <p>Bonjour ${user.email},</p>
          <p>Voici le lien pour réinitialiser ton mot de passe :</p>
          <p><a href="${url}">Réinitialiser mon mot de passe</a></p>
        `,
      });
    }
    
  },
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
