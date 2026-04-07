import { Mail, Send, FileText } from "lucide-react";

const CONTACT_EMAIL = "vaga.tuktuk@gmail.com";

const ContactSection = () => {
  const subject = encodeURIComponent("Contact depuis le site Bitcoin");
  const body = encodeURIComponent("Bonjour,\n\n");
  const articleSubject = encodeURIComponent("Proposition d'article pour le site");
  const articleBody = encodeURIComponent("Bonjour,\n\nJe souhaite proposer un article pour publication sur votre site.\n\nSujet : \n\nCordialement,");

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Mail className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Contact</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Une question sur Bitcoin ? Envie d'échanger ? N'hésite pas à nous contacter.
        </p>
        <p className="text-muted-foreground mb-8">
          <FileText className="inline w-4 h-4 mr-1 -mt-0.5" />
          Tu souhaites publier un article sur le site ? Contacte-nous avec ta proposition !
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Send className="h-5 w-5" />
            Nous envoyer un message
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${articleSubject}&body=${articleBody}`}
            className="inline-flex items-center gap-2 border border-primary/30 text-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary/60 hover:bg-secondary transition-colors"
          >
            <FileText className="h-5 w-5" />
            Proposer un article
          </a>
        </div>
        <p className="text-muted-foreground text-sm mt-4 font-mono">
          {CONTACT_EMAIL}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
