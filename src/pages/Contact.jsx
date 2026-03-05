import React from "react";
import { PageLayout } from "../components/PageLayout";
import IconButton from "../components/IconButton";
import {
  Send,
  MessageCircle,
  ArrowRight,
  Mail,
  User,
  Share2,
  Copy,
  Check,
  Phone,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";

function Contact() {
  const { content, loading } = useContent();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [showForm, setShowForm] = React.useState(false);
  const [copiedLabel, setCopiedLabel] = React.useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = React.useState(null); // 'Email' | 'Phone' | null

  React.useEffect(() => {
    if (activeMobileMenu) {
      const timer = setTimeout(() => {
        setActiveMobileMenu(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeMobileMenu]);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { contact, global, home } = content;
  const { meta, form, info, availability } = contact;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
  }

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Left Content
  const leftContent = (
    <div className="space-y-12">
      <div className="animate-in fade-in slide-in-from-left-4 duration-700 space-y-8">
        <div className="space-y-6">
          {!showForm ? (
            /* WhatsApp Card */
            <>
              <div className="space-y-4">
                <p className="text-white/50 max-w-lg leading-relaxed lg:mb-10 text-lg">
                  {contact.whatsapp.description}
                </p>
              </div>
              <a
                href={`https://wa.me/${info.find((i) => i.label === "Phone")?.value?.replace(/\D/g, "") || "919876543210"}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn group relative flex items-center justify-between gap-4 p-5 py-4 lg:p-6 rounded-3xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-500 overflow-hidden max-w-md shadow-2xl"
                style={{ boxShadow: "0 0 50px -12px rgba(34, 197, 94, 0.15)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="flex items-center gap-5 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 text-green-500 shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform">
                    <Icon name="Whatsapp" className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl">
                      {contact.whatsapp.label}
                    </p>
                    <p className="text-sm text-green-500/60 font-medium tracking-wide">
                      {contact.whatsapp.hint}
                    </p>
                  </div>
                </div>

                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </>
          ) : (
            /* Email Form */
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-8 mb-8">
              <div className="flex items-center justify-between">
                <p className="text-white/50 max-w-lg leading-relaxed text-lg">
                  {contact.whatsapp.description}
                </p>
              </div>

              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1"
                    >
                      {form.fields.name.label}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={form.fields.name.placeholder}
                      className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--emerald)/0.4)] focus:!ring-[hsl(var(--emerald)/0.2)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1"
                    >
                      {form.fields.email.label}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={form.fields.email.placeholder}
                      className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--emerald)/0.4)] focus:!ring-[hsl(var(--emerald)/0.2)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1"
                  >
                    {form.fields.message.label}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={form.fields.message.placeholder}
                    className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--emerald)/0.4)] focus:!ring-[hsl(var(--emerald)/0.2)] resize-none"
                  />
                </div>

                <div className="pt-4">
                  <PrimaryButton
                    type="submit"
                    theme="emerald"
                    className="w-full lg:w-fit lg:px-12"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {form.submitLabel}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          )}

          {/* Toggle Link Area */}
          <div className="pt-2">
            {!showForm ? (
              <p className="text-white/30 text-sm">
                {contact.prompts.formal}{" "}
                <button
                  onClick={() => setShowForm(true)}
                  className="text-[hsl(var(--emerald))] hover:underline font-medium"
                >
                  {contact.prompts.switchToEmail}
                </button>
              </p>
            ) : (
              <p className="text-white/30 text-sm">
                {contact.prompts.informal}{" "}
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[hsl(var(--emerald))] hover:underline font-medium"
                >
                  {contact.prompts.switchToWhatsApp}
                </button>
              </p>
            )}
          </div>

          <div className="mobile-sticky-bar lg:hidden px-4 flex gap-3 pb-8">
            <PrimaryButton
              href={`https://wa.me/${info.find((i) => i.label === "Phone")?.value?.replace(/\D/g, "") || "919876543210"}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
              target="_blank"
              onClick={() => {
                setShowForm(false);
                setActiveMobileMenu(null);
              }}
              theme="emerald"
              containerClass="flex-1"
              className="!h-14 !px-4"
              icon={
                <Icon
                  name="Whatsapp"
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                />
              }
            >
              {contact.labels.whatsAppShort}
            </PrimaryButton>

            {["Email", "Phone"].map((type) => {
              const item = info.find((i) => i.label === type);
              const IconComp = type === "Email" ? Mail : Phone;
              const href =
                type === "Email"
                  ? `mailto:${item?.value}`
                  : `tel:${item?.value?.replace(/\D/g, "")}`;
              const isOpen = activeMobileMenu === type;

              return (
                <div key={type} className="relative">
                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-[60]"
                        onClick={() => setActiveMobileMenu(null)}
                      />
                      <div className="absolute bottom-full right-0 mb-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-1 min-w-[200px] z-[70] animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <a
                          href={href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium transition-all active:scale-95 group/item"
                          onClick={() => setActiveMobileMenu(null)}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--emerald)/0.15)] text-[hsl(var(--emerald))] group-hover/item:bg-[hsl(var(--emerald)/0.25)] transition-colors">
                            <ArrowRight size={16} />
                          </div>
                          {type === "Email"
                            ? contact.labels.sendMail
                            : contact.labels.callNow}
                        </a>
                        <button
                          onClick={() => {
                            handleCopy(item?.value, type);
                            setActiveMobileMenu(null);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium transition-all active:scale-95 group/item text-white/70"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40 group-hover/item:text-white transition-colors">
                            <Copy size={16} />
                          </div>
                          {contact.labels.copy} {type}
                        </button>
                      </div>
                    </>
                  )}
                  <IconButton
                    icon={IconComp}
                    theme="neutral"
                    size="sm"
                    className={`!h-14 !w-14 !rounded-xl transition-all duration-300 ${isOpen ? "!bg-white/10 !border-white/20" : ""}`}
                    onClick={() => setActiveMobileMenu(isOpen ? null : type)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Right Content
  const rightContent = (
    <div className="space-y-8 mt-6 mb-10 lg:my-0">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-foreground">
          <User size={20} className="text-[hsl(var(--emerald))]" />
          <h3 className="text-xl font-bold tracking-tight">
            {contact.labels.connect}
          </h3>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--emerald)/0.1)] bg-[hsl(var(--emerald)/0.02)] backdrop-blur-sm p-1  lg:p-3 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-1">
            {/* Contact Details */}
            <div className="p-2 lg:pr-4 pl-0">
              {info
                .filter((i) => i.label !== "Location")
                .map(function (item) {
                  const Icon = getIcon(item.icon);
                  let href = undefined;
                  if (item.label === "Phone")
                    href = `tel:${item.value.replace(/\D/g, "")}`;
                  if (item.label === "Email") href = `mailto:${item.value}`;

                  const content = (
                    <div className="flex items-center gap-3 lg:gap-4 w-full min-w-0">
                      <IconButton
                        icon={Icon}
                        theme="neutral"
                        size="xs"
                        className="shrink-0 pointer-events-none lg:w-12 lg:h-12 lg:rounded-xl"
                      />
                      <div className="min-w-0 pr-2 lg:pr-4">
                        <p className="text-[14px] text-white/90 font-medium truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-2 lg:gap-4 min-w-0"
                    >
                      {/* Desktop Link: Entire row clickable */}
                      <a
                        href={href}
                        className="hidden lg:flex flex-1 items-center justify-between p-3 rounded-xl hover:bg-green-500/10 border border-transparent hover:border-white/5 transition-all group/row min-w-0"
                      >
                        {content}
                        <ArrowRight
                          size={22}
                          className="text-white/30 group-hover/row:text-[hsl(var(--emerald))] group-hover/row:translate-x-1 transition-all"
                        />
                      </a>

                      {/* Mobile Container: Non-clickable row */}
                      <div className="lg:hidden flex-1 flex items-center p-2 min-w-0">
                        {content}
                      </div>

                      <div className="flex items-center gap-2 lg:gap-5 shrink-0 pr-1 lg:pr-0">
                        {/* Arrow Action Button (Mobile Only) */}
                        <IconButton
                          icon={ArrowRight}
                          href={href}
                          theme="neutral"
                          size="xs"
                          className="lg:hidden !bg-white/5 !border-white/10"
                        />

                        {/* Copy Button */}
                        <IconButton
                          icon={copiedLabel === item.label ? Check : Copy}
                          theme="neutral"
                          size="xs"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCopy(item.value, item.label);
                          }}
                          className={`!rounded-xl transition-all duration-300 lg:w-12 lg:h-12 ${
                            copiedLabel === item.label
                              ? "!bg-[hsl(var(--emerald)/0.2)] !text-[hsl(var(--emerald))] !border-[hsl(var(--emerald)/0.4)]"
                              : "!bg-white/5 !border-white/10 text-white/40 hover:!text-white hover:!bg-white/10"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mx-4 my-2" />

            {/* Bottom Row: Socials & Location */}
            <div className="grid lg:grid-cols-2 gap-4 p-4 pt-2">
              {/* Social Links Column */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-1">
                  {contact.labels.socialProfiles}
                </p>
                <div className="flex flex-wrap gap-4">
                  {global.socialLinks.map(function (item) {
                    const Icon = getIcon(item.icon);
                    return (
                      <IconButton
                        key={item.label}
                        icon={Icon}
                        theme="emerald"
                        href={item.url}
                        aria-label={item.label}
                        size="sm"
                        className="hover:scale-110"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Location Column */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-1">
                  {contact.labels.location}
                </p>
                {info
                  .filter((i) => i.label === "Location")
                  .map(function (item) {
                    const Icon = getIcon(item.icon);
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 px-1"
                      >
                        <IconButton
                          icon={Icon}
                          theme="neutral"
                          size="xs"
                          className="shrink-0 pointer-events-none lg:w-12 lg:h-12 lg:rounded-xl"
                        />
                        <div className="min-w-0 pr-4">
                          <p className="text-[14px] text-white/90 font-medium truncate">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const letsBuildSection = home?.finalCta ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="max-w-5xl mx-auto px-6 py-24 lg:px-16 relative z-10 mb-24"
    >
      <div className="relative rounded-[3rem] overflow-hidden border border-emerald-500/30 bg-emerald-500/[0.05] p-12 lg:p-20 text-center backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10" />

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-500/40 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <MessageSquare size={32} />
          </div>

          <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 max-w-2xl">
            {home.finalCta.title}
          </h3>
          <p className="text-xl text-white/60 mb-10 max-w-xl">
            {home.finalCta.subtitle}
          </p>

          <PrimaryButton
            theme="emerald"
            href="/contact"
            icon={<ArrowRight className="w-5 h-5" />}
            className="!px-10 !h-16 !text-lg !rounded-2xl"
          >
            {home.finalCta.ctaLabel}
          </PrimaryButton>
        </div>
      </div>
    </motion.div>
  ) : null;

  const rightWithCta = (
    <div className="space-y-16">
      {rightContent}
      {letsBuildSection}
    </div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      left={leftContent}
      right={rightWithCta}
    />
  );
}

export default Contact;
