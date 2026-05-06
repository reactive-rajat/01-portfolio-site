import React from "react";
import { PageLayout } from "../components/PageLayout";
import IconButton from "../components/IconButton";
import {
  Send,
  ArrowRight,
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  MessageSquare
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motionVariants";

function Contact() {
  const { content, loading } = useContent();
  const isDesktop = useIsDesktop();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [showForm, setShowForm] = React.useState(false);
  const [copiedLabel, setCopiedLabel] = React.useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = React.useState(null);

  React.useEffect(() => {
    if (activeMobileMenu) {
      const timer = setTimeout(() => setActiveMobileMenu(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [activeMobileMenu]);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { contact, global } = content;
  const { meta, form, info } = contact;

  const phoneNumber =
    info.find((i) => i.label === "Phone")?.value?.replace(/\D/g, "") ||
    "919876543210";

  const emailItem = info.find((i) => i.label === "Email");
  const phoneItem = info.find((i) => i.label === "Phone");

  // ── Main page content (two columns) ──
  const pageContent = (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid lg:grid-cols-[1.2fr_500px] gap-10 lg:gap-16 pb-10 items-start w-full"
    >
      {/* ── Left Column (Primary Navigation) ── */}
      <div className="flex flex-col gap-6">
        <motion.div variants={fadeInUp} className="space-y-6">
          <p className="type-body text-white/50 max-w-xl">
            {contact.whatsapp.description}
          </p>

          {/* WhatsApp External Link Card */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-400 overflow-hidden max-w-lg w-full text-left ${!showForm ? "border-green-500/20 bg-green-500/5 hover:bg-green-500/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}
            style={!showForm ? { boxShadow: "0 0 40px -16px rgba(34,197,94,0.2)" } : {}}
          >
            {!showForm && <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
            <div className="flex items-center gap-4 relative z-10">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform ${!showForm ? "bg-green-500/20 text-green-500 group-hover:scale-110" : "bg-white/5 text-white/50 group-hover:scale-110"}`}>
                <Icon name="Whatsapp" className="w-6 h-6" />
              </div>
              <div>
                <p className={`type-body-lg font-bold mb-1 ${!showForm ? "text-white" : "text-white/60"}`}>
                  {contact.whatsapp.label}
                </p>
                <p className={`type-body-sm font-medium transition-colors ${!showForm ? "text-green-500/60" : "text-white/40 group-hover:text-white/60"}`}>
                  {contact.whatsapp.hint}
                </p>
              </div>
            </div>
            <div className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-full transition-colors relative z-10 ${!showForm ? "bg-white/5 border border-white/10 text-white/40 group-hover:text-white" : "bg-white/5 border border-white/10 text-white/40 group-hover:text-white"}`}>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>

          {/* Email Toggle Card */}
          <button
            onClick={() => setShowForm(!showForm)}
            className={`group relative flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-400 overflow-hidden max-w-lg w-full text-left ${showForm ? 'border-[hsl(var(--theme-base)/0.4)] bg-[hsl(var(--theme-base)/0.1)]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'}`}
            style={showForm ? { boxShadow: "0 0 40px -16px hsl(var(--theme-base)/0.2)" } : {}}
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform ${showForm ? 'bg-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))] group-hover:scale-110' : 'bg-white/5 text-white/50 group-hover:scale-110'}`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className={`type-body-lg font-bold mb-1 ${showForm ? 'text-white' : 'text-white/60'}`}>
                  Email
                </p>
                <p className={`type-body-sm font-medium transition-colors ${showForm ? 'text-[hsl(var(--theme-base)/0.8)]' : 'text-white/40 group-hover:text-white/60'}`}>
                  {showForm ? 'Close email form' : 'Send a direct message'}
                </p>
              </div>
            </div>
            <div className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-full transition-colors relative z-10 ${showForm ? 'bg-[hsl(var(--theme-base)/0.2)] border border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]' : 'bg-white/5 border border-white/10 text-white/40 group-hover:text-white'}`}>
              <ArrowRight className={`w-4 h-4 transition-transform ${showForm ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
            </div>
          </button>

          <p className="text-white/30 text-sm mt-4 max-w-lg">
            {contact.prompts.formal}
          </p>
        </motion.div>

                {/* ── Compact Secondary Info (Phone, Location, Socials) ── */}
        <motion.div variants={fadeInUp} className="mt-6 pt-6 border-t border-white/10 w-full space-y-5">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {/* Phone */}
            {phoneItem && (
              <div className="tooltip-wrapper relative">
                <button
                  onClick={(e) => { e.preventDefault(); handleCopy(phoneItem.value, "Phone"); }}
                  className="group flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors text-left w-full"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${copiedLabel === "Phone" ? "bg-[hsl(var(--theme-base)/0.2)] border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]" : "bg-white/5 border-white/10 text-white/50 group-hover:text-white"}`}>
                    {copiedLabel === "Phone" ? <Check size={14} /> : <Phone size={14} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate transition-colors ${copiedLabel === "Phone" ? "text-[hsl(var(--theme-base))]" : "text-white/80 group-hover:text-white"}`}>
                      {copiedLabel === "Phone" ? "Copied!" : phoneItem.value}
                    </p>
                  </div>
                </button>
                {isDesktop && (
                  <div className="tooltip-panel !left-4">
                    <span className="tooltip-title">Click to copy Phone</span>
                  </div>
                )}
              </div>
            )}

            {/* Email */}
            {emailItem && (
              <div className="tooltip-wrapper relative">
                <button
                  onClick={(e) => { e.preventDefault(); handleCopy(emailItem.value, "Email"); }}
                  className="group flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors text-left w-full"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${copiedLabel === "Email" ? "bg-[hsl(var(--theme-base)/0.2)] border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]" : "bg-white/5 border-white/10 text-white/50 group-hover:text-white"}`}>
                    {copiedLabel === "Email" ? <Check size={14} /> : <Mail size={14} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate transition-colors ${copiedLabel === "Email" ? "text-[hsl(var(--theme-base))]" : "text-white/80 group-hover:text-white"}`}>
                      {copiedLabel === "Email" ? "Copied!" : emailItem.value}
                    </p>
                  </div>
                </button>
                {isDesktop && (
                  <div className="tooltip-panel !left-4">
                    <span className="tooltip-title">Click to copy Email</span>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            {info.filter((i) => i.label === "Location").map((item) => {
              const ItemIcon = getIcon(item.icon) || MapPin;
              return (
                <div key={item.label} className="flex items-center gap-3 p-2 -mx-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/50">
                    <ItemIcon size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/80 font-medium truncate">{item.value}</p>
                  </div>
                </div>
              );
            })}
            {/* Socials */}
            <div className="flex flex-wrap items-center gap-3 p-2 -mx-2 xl:justify-end">
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mr-1">{contact.labels.socialProfiles}</span>
              {global.socialLinks.map((item) => {
                const SocialIcon = getIcon(item.icon);
                return (
                  <IconButton
                    key={item.label}
                    icon={SocialIcon}
                    theme="neutral"
                    href={item.url}
                    aria-label={item.label}
                    size="social"
                    className="!w-9 !h-9"
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Right Column (Dynamic) ── */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center gap-6 p-12 lg:p-16 h-full min-h-[400px] rounded-3xl border border-white/5 bg-white/[0.01]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(var(--theme-base))] blur-[80px] opacity-20 animate-pulse" />
                <div className="flex items-center justify-center w-24 h-24 rounded-3xl border border-white/10 bg-white/5 relative z-10">
                  <MessageSquare size={40} className="text-[hsl(var(--theme-base))] opacity-80" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="type-heading-3 text-white">Let's Connect</h3>
                <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Reach out via WhatsApp for a quick chat, or switch to email for a more formal introduction!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 p-6 lg:p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl relative"
            >
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="type-heading-3 text-white">Send a Message</h3>
                  <p className="text-white/50 text-sm">Fill out the form below and I'll get back to you shortly.</p>
                </div>
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">
                        {form.fields.name.label}
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleInputChange}
                        placeholder={form.fields.name.placeholder}
                        className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--theme-base)/0.4)] focus:!ring-[hsl(var(--theme-base)/0.2)]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">
                        {form.fields.email.label}
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleInputChange}
                        placeholder={form.fields.email.placeholder}
                        className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--theme-base)/0.4)] focus:!ring-[hsl(var(--theme-base)/0.2)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">
                      {form.fields.message.label}
                    </label>
                    <textarea
                      id="message" name="message" required rows={4}
                      value={formData.message} onChange={handleInputChange}
                      placeholder={form.fields.message.placeholder}
                      className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--theme-base)/0.4)] focus:!ring-[hsl(var(--theme-base)/0.2)] resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <PrimaryButton
                      type="submit"
                      icon={<Send className="w-4 h-4" />}
                      className="!px-8 flex-1 sm:flex-none justify-center"
                    >
                      {form.submitLabel}
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile sticky bar */}
      <div className="mobile-sticky-bar lg:hidden px-4 flex gap-3 pb-8 col-span-full">
        <PrimaryButton
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
          target="_blank"
          onClick={() => { setActiveMobileMenu(null); setShowForm(false); }}
          containerClass="flex-1"
          className="!h-14 !px-4"
          icon={<Icon name="Whatsapp" className="w-5 h-5 transition-transform group-hover:scale-110" />}
        >
          {contact.labels.whatsAppShort}
        </PrimaryButton>

        {["Email", "Phone"].map((type) => {
          const item = info.find((i) => i.label === type);
          const IconComp = type === "Email" ? Mail : Phone;
          const href = type === "Email" ? `mailto:${item?.value}` : `tel:${item?.value?.replace(/\D/g, "")}`;
          const isOpen = activeMobileMenu === type;

          return (
            <div key={type} className="relative">
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-[60]" onClick={() => setActiveMobileMenu(null)} />
                  <div className="absolute bottom-full right-0 mb-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-1 min-w-[200px] z-[70] animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <a
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium transition-all active:scale-95 group/item"
                      onClick={() => setActiveMobileMenu(null)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--theme-base)/0.15)] text-[hsl(var(--theme-base))]">
                        <ArrowRight size={16} />
                      </div>
                      {type === "Email" ? contact.labels.sendMail : contact.labels.callNow}
                    </a>
                    <button
                      onClick={() => { handleCopy(item?.value, type); setActiveMobileMenu(null); }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium transition-all active:scale-95 group/item text-white/70"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40">
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
                onClick={() => {
                  setActiveMobileMenu(isOpen ? null : type);
                  if (type === "Email") setShowForm(true);
                }}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      description={meta.description}
    >
      {pageContent}
    </PageLayout>
  );
}

export default Contact;
