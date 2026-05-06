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
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motionVariants";

function Contact() {
  const { content, loading } = useContent();

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // ── Contact details: email, phone, location ──
  const detailItems = info;
  const emailItem = info.find((i) => i.label === "Email");
  const phoneItem = info.find((i) => i.label === "Phone");

  // ── Main page content (single column) ──
  const pageContent = (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid lg:grid-cols-[1fr_350px] gap-10 lg:gap-16 pb-10 items-start w-full"
    >
      {/* ── Left Column (Primary) ── */}
      <div className="flex flex-col gap-6">
        <motion.div variants={fadeInUp} className="space-y-6">
          <p className="type-body text-white/50 max-w-xl">
            {contact.whatsapp.description}
          </p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between gap-4 p-5 rounded-2xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-400 overflow-hidden max-w-lg"
            style={{ boxShadow: "0 0 40px -16px rgba(34,197,94,0.2)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-green-500 group-hover:scale-110 transition-transform">
                <Icon name="Whatsapp" className="w-6 h-6" />
              </div>
              <div>
                <p className="type-body-lg font-bold text-white mb-1">
                  {contact.whatsapp.label}
                </p>
                <p className="type-body-sm text-green-500/60 font-medium">
                  {contact.whatsapp.hint}
                </p>
              </div>
            </div>
            <div className="shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors relative z-10">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

          {/* Email Card/Button Toggle */}
          <button
            onClick={() => setShowForm(!showForm)}
            className={`group relative flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-400 overflow-hidden max-w-lg w-full text-left ${showForm ? 'border-[hsl(var(--theme-base)/0.4)] bg-[hsl(var(--theme-base)/0.1)]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'}`}
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform ${showForm ? 'bg-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))]' : 'bg-white/5 text-white/50 group-hover:scale-110'}`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="type-body-lg font-bold text-white mb-1">
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

          {showForm && (
            <div className="animate-in fade-in slide-in-from-top-3 duration-400 space-y-4 max-w-lg pt-2">
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
                <PrimaryButton
                  type="submit"
                  icon={<Send className="w-4 h-4" />}
                  className="!px-8"
                >
                  {form.submitLabel}
                </PrimaryButton>
              </form>
            </div>
          )}

          <p className="text-white/30 text-sm">
            {!showForm ? contact.prompts.formal : contact.prompts.informal}
          </p>
        </motion.div>
      </div>

      {/* ── Right Column (Secondary) ── */}
      <div className="flex flex-col gap-8 p-6 lg:p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <motion.div variants={fadeInUp} className="flex flex-col gap-3">
          {/* Phone */}
          {phoneItem && (
            <a
              href={`tel:${phoneItem.value.replace(/\D/g, "")}`}
              className="group flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.025] hover:border-[hsl(var(--theme-base)/0.4)] hover:bg-[hsl(var(--theme-base)/0.05)] transition-all duration-300"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50 group-hover:bg-[hsl(var(--theme-base)/0.15)] group-hover:text-[hsl(var(--theme-base))] group-hover:border-[hsl(var(--theme-base)/0.3)] transition-all">
                <Phone size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Phone</p>
                <p className="text-sm text-white/80 font-medium truncate group-hover:text-white transition-colors">
                  {phoneItem.value}
                </p>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); handleCopy(phoneItem.value, "Phone"); }}
                className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                  copiedLabel === "Phone"
                    ? "bg-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))]"
                    : "text-white/20 hover:text-white/60"
                }`}
              >
                {copiedLabel === "Phone" ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </a>
          )}

          {/* Location */}
          {info.filter((i) => i.label === "Location").map((item) => {
            const ItemIcon = getIcon(item.icon);
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.025]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50">
                  {ItemIcon && <ItemIcon size={15} />}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Location</p>
                  <p className="text-sm text-white/80 font-medium truncate">{item.value}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Socials */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-4 pt-4 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">
            {contact.labels.socialProfiles}
          </p>
          <div className="flex flex-wrap items-center gap-3">
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
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Mobile sticky bar */}
      <div className="mobile-sticky-bar lg:hidden px-4 flex gap-3 pb-8 col-span-full">
        <PrimaryButton
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
          target="_blank"
          onClick={() => { setShowForm(false); setActiveMobileMenu(null); }}
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
                onClick={() => setActiveMobileMenu(isOpen ? null : type)}
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
      right={pageContent}
    />
  );
}

export default Contact;
