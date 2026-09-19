import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/i18n/use-i18n";
import { useInView } from "@/hooks/use-in-view";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Tu nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  subject: z
    .string()
    .max(200, "Máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  website: z.string().optional(),
  message: z.string().min(10, "Cuéntame un poco más (mín. 10 caracteres)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      website: "",
    },
    mode: "onBlur",
  });

  const { ref, inView } = useInView<HTMLDivElement>();

  const onSubmit = async (values: ContactFormValues) => {
    if (values.website) {
      toast.success(t("contactSection.toastSuccess"));
      reset();
      return;
    }
    try {
      setLoading(true);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: values.name,
          email: values.email,
          subject: values.subject || "Nuevo mensaje desde el sitio",
          company: values.company || "N/A",
          message: values.message,
          reply_to: values.email,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      toast.success(t("contactSection.toastSuccess"));
      reset();
    } catch {
      toast.error(
        t("contactSection.toastError") || "No se pudo enviar el mensaje",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="py-32 md:py-44 lg:py-56 border-t border-border relative overflow-hidden"
    >
      <div
        ref={ref}
        data-inview={inView}
        className="container-page relative reveal"
      >
        <div className="mb-16 text-center max-w-[42rem] mx-auto">
          <h2 className="text-display-2 text-foreground text-balance mb-4">
            {t("contactSection.title")}
          </h2>
          <p className="text-lead text-muted-foreground text-pretty">
            {t("contactSection.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 max-w-[72rem]">
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                label: t("contactSection.emailLabel"),
                value: "fernandooibarra@gmail.com",
              },
              {
                icon: Phone,
                label: t("contactSection.phoneLabel"),
                value: "(662) 291-4052",
              },
              {
                icon: MapPin,
                label: t("contactSection.locationLabel"),
                value: t("contactSection.locationValue"),
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 border-l border-border-strong pl-4"
              >
                <div className="w-9 h-9 rounded-md bg-foreground/5 flex items-center justify-center shrink-0">
                  <Icon
                    className="h-4 w-4 text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-eyebrow uppercase text-muted-foreground mb-1">
                    {label}
                  </p>
                  <p className="text-meta text-foreground/90">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            id="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <input
              type="text"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
              {...register("website")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-mono-sm text-muted-foreground"
                >
                  {t("contactSection.namePlaceholder")} *
                </label>
                <Input
                  id="contact-name"
                  placeholder={t("contactSection.namePlaceholder")}
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-err" : undefined
                  }
                  className="h-11 px-4 bg-card border-border-strong focus:border-signal-ink"
                  {...register("name")}
                />
                {errors.name && (
                  <p
                    id="contact-name-err"
                    role="alert"
                    className="text-mono-sm text-signal-ink"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-mono-sm text-muted-foreground"
                >
                  {t("contactSection.emailPlaceholder")} *
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={t("contactSection.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-err" : undefined
                  }
                  className="h-11 px-4 bg-card border-border-strong focus:border-signal-ink"
                  {...register("email")}
                />
                {errors.email && (
                  <p
                    id="contact-email-err"
                    role="alert"
                    className="text-mono-sm text-signal-ink"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-subject"
                className="text-mono-sm text-muted-foreground"
              >
                {t("contactSection.subjectPlaceholder")}
              </label>
              <Input
                id="contact-subject"
                placeholder={t("contactSection.subjectPlaceholder")}
                aria-invalid={!!errors.subject}
                className="h-11 px-4 bg-card border-border-strong focus:border-signal-ink"
                {...register("subject")}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="text-mono-sm text-muted-foreground"
              >
                {t("contactSection.messagePlaceholder")} *
              </label>
              <Textarea
                id="contact-message"
                placeholder={t("contactSection.messagePlaceholder")}
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "contact-message-err" : undefined
                }
                className="px-4 py-3 bg-card border-border-strong focus:border-signal-ink resize-none min-h-[140px]"
                {...register("message")}
              />
              {errors.message && (
                <p
                  id="contact-message-err"
                  role="alert"
                  className="text-mono-sm text-signal-ink"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full sm:w-auto px-8 bg-foreground text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {loading
                ? t("contactSection.sending")
                : t("contactSection.sendButton")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
