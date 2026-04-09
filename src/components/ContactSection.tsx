import { Mail, Send } from "lucide-react";

const CONTACT_EMAIL = "vaga.tuktuk@gmail.com"; // Remplace par ton email

const ContactSection = () => {
  const subject = encodeURIComponent("Contact depuis le site Bitcoin");
  const body = encodeURIComponent("Bonjour,\n\n");

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Mail className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Contact</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          Une question sur Bitcoin ? Envie d'échanger ? Si tu veux publier un lien sur le site ? N'hésite pas à me contacter.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Send className="h-5 w-5" />
          M'envoyer un message
        </a>
        <p className="text-muted-foreground text-sm mt-4 font-mono">
          {CONTACT_EMAIL}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
