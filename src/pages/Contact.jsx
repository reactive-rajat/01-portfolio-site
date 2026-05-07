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
  MessageSquare,
  MoreVertical,
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
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsSocialMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className="grid lg:grid-cols-[1fr_550px] gap-10 lg:gap-16 items-start w-full"
    >
      {/* ── Left Column (Primary Navigation) ── */}
      <div className="flex flex-col gap-6">
        <motion.div variants={fadeInUp} className="space-y-6">
          {/* WhatsApp External Link Card */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-400 overflow-hidden max-w-lg w-full text-left ${!showForm ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/15" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}
            style={
              !showForm
                ? { boxShadow: "0 0 40px -10px rgba(34,197,94,0.3)" }
                : {}
            }
          >
            {!showForm && (
              <>
                <div className="btn-shine opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </>
            )}
            <div className="flex items-center gap-4 relative z-10">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform ${!showForm ? "bg-green-500/20 text-green-500 group-hover:scale-110" : "bg-white/5 text-white/50 group-hover:scale-110"}`}
              >
                <Icon name="Whatsapp" className="w-6 h-6" />
              </div>
              <div>
                <p
                  className={`type-body-lg font-bold mb-1 ${!showForm ? "text-white" : "text-white/60"}`}
                >
                  {contact.whatsapp.label}
                </p>
                <p
                  className={`type-body-sm font-medium transition-colors ${!showForm ? "text-green-500/80" : "text-white/40 group-hover:text-white/60"}`}
                >
                  {contact.whatsapp.hint}
                </p>
              </div>
            </div>
            <div
              className={`shrink-0 h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 relative z-10 ${!showForm ? "bg-green-500 text-[#0a0a0a] group-hover:bg-green-400 group-hover:scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-white/5 border border-white/10 text-white/40 group-hover:text-white"}`}
            >
              <ArrowRight strokeWidth={2.5} className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>

          {/* Email Toggle Card */}
          <button
            onClick={() => setShowForm(!showForm)}
            className={`group relative flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-400 overflow-hidden max-w-lg w-full text-left ${showForm ? "border-[hsl(var(--theme-base)/0.4)] bg-[hsl(var(--theme-base)/0.1)]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}
            style={
              showForm
                ? { boxShadow: "0 0 40px -16px hsl(var(--theme-base)/0.2)" }
                : {}
            }
          >
            <div className="flex items-center gap-4 relative z-10">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform ${showForm ? "bg-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))] group-hover:scale-110" : "bg-white/5 text-white/50 group-hover:scale-110"}`}
              >
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p
                  className={`type-body-lg font-bold mb-1 ${showForm ? "text-white" : "text-white/60"}`}
                >
                  Email
                </p>
                <p
                  className={`type-body-sm font-medium transition-colors ${showForm ? "text-[hsl(var(--theme-base)/0.8)]" : "text-white/40 group-hover:text-white/60"}`}
                >
                  {showForm ? "Close email form" : "Send a direct message"}
                </p>
              </div>
            </div>
            <div
              className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-full transition-colors relative z-10 ${showForm ? "bg-[hsl(var(--theme-base)/0.2)] border border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]" : "bg-white/5 border border-white/10 text-white/40 group-hover:text-white"}`}
            >
              <ArrowRight
                className={`w-4 h-4 transition-transform ${showForm ? "rotate-90" : "group-hover:translate-x-0.5"}`}
              />
            </div>
          </button>

          <p className="type-body-sm text-white/30 mt-4 max-w-lg">
            {contact.prompts.formal}
          </p>
        </motion.div>

                {/* ── Compact Secondary Info (Phone, Email, Socials) ── */}
                <motion.div variants={fadeInUp} className="w-full max-w-lg mt-8 p-5 lg:p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
                  {/* Phone */}
                  {phoneItem && (
                    <div className="tooltip-wrapper relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(phoneItem.value, "Phone");
                        }}
                        className="group flex flex-col items-center gap-1.5 p-2 -my-2 rounded-xl transition-all text-center"
                      >
                        <p className="type-label text-white/30">
                          PHONE
                        </p>
                        <div className="relative flex items-center justify-center gap-2">
                          <p className={`type-body-sm font-medium transition-colors duration-300 ${copiedLabel === "Phone" ? "opacity-0" : "text-white/80 group-hover:text-white"}`}>
                            {phoneItem.value}
                          </p>
                          <Copy size={12} className={`transition-opacity duration-300 ${copiedLabel === "Phone" ? "opacity-0" : "text-white/30 group-hover:text-white/60"}`} />
                          <div className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-300 ${copiedLabel === "Phone" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                            <p className="type-body-sm font-medium text-[hsl(var(--theme-base))]">Copied!</p>
                            <Check size={12} className="text-[hsl(var(--theme-base))]" />
                          </div>
                        </div>
                      </button>
                      {isDesktop && (
                        <div className="tooltip-panel">
                          <span className="tooltip-title">Click to copy Phone</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Email */}
                  {emailItem && (
                    <div className="tooltip-wrapper relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(emailItem.value, "Email");
                        }}
                        className="group flex flex-col items-center gap-1.5 p-2 -my-2 rounded-xl transition-all text-center"
                      >
                        <p className="type-label text-white/30">
                          EMAIL
                        </p>
                        <div className="relative flex items-center justify-center gap-2">
                          <p className={`type-body-sm font-medium transition-colors duration-300 ${copiedLabel === "Email" ? "opacity-0" : "text-white/80 group-hover:text-white"}`}>
                            {emailItem.value}
                          </p>
                          <Copy size={12} className={`transition-opacity duration-300 ${copiedLabel === "Email" ? "opacity-0" : "text-white/30 group-hover:text-white/60"}`} />
                          <div className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-300 ${copiedLabel === "Email" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                            <p className="type-body-sm font-medium text-[hsl(var(--theme-base))]">Copied!</p>
                            <Check size={12} className="text-[hsl(var(--theme-base))]" />
                          </div>
                        </div>
                      </button>
                      {isDesktop && (
                        <div className="tooltip-panel">
                          <span className="tooltip-title">Click to copy Email</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Socials 3-Dots */}
                  <div className="relative" ref={menuRef}>
                    <IconButton 
                      icon={MoreVertical} 
                      theme="neutral" 
                      onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                      size="social"
                      className={`!w-10 !h-10 !rounded-full transition-all duration-300 hover:!bg-[hsl(var(--theme-base)/0.1)] hover:!text-[hsl(var(--theme-base))] hover:!border-[hsl(var(--theme-base)/0.4)] ${isSocialMenuOpen ? "!bg-[hsl(var(--theme-base)/0.1)] !text-[hsl(var(--theme-base))] !border-[hsl(var(--theme-base)/0.4)]" : "bg-white/5 border-white/10 text-white/50"}`} 
                    />
                    
                    <AnimatePresence>
                      {isSocialMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full mb-3 right-0 min-w-[200px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110]"
                        >
                          <div className="px-3 py-2 text-center">
                            <p className="type-label text-white/30">{global.labels.socialProfiles}</p>
                          </div>
                          <div className="flex flex-wrap justify-center gap-2 px-2 pb-2">
                            {global.socialLinks.map((link, idx) => {
                              const SocialIcon = getIcon(link.icon);
                              return (
                                <IconButton 
                                  key={link.label} 
                                  icon={SocialIcon} 
                                  theme="neutral" 
                                  href={link.url} 
                                  aria-label={link.label} 
                                  size="social"
                                  className="!w-10 !h-10 animate-in fade-in zoom-in-75 duration-300"
                                  style={{ animationDelay: `${idx * 50}ms` }} 
                                  onClick={() => setIsSocialMenuOpen(false)} 
                                />
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
              className="flex flex-col justify-center items-center gap-8 p-6 lg:p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl shadow-2xl relative min-h-[465px]"
            >
              <div className="flex flex-col items-center justify-center gap-6 w-full mx-auto">
                {/* Chat Mockup */}
                <div className="relative w-full max-w-[320px] mx-auto text-left">
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Date Badge */}
                    <div className="flex justify-center">
                      <span className="bg-white/5 border border-white/10 text-white/40 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                        Today
                      </span>
                    </div>

                    {/* Received Bubble */}
                    <div className="self-start bg-[#202c33] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-lg">
                      <p className="type-body-sm text-[#e9edef]">Hey Alex! We have a new enterprise web app project. Are you available for freelance work? 🚀</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[10px] text-white/40">10:00 AM</span>
                      </div>
                    </div>
                    
                    {/* Sent Bubble (Less Opaque) */}
                    <div className="self-end bg-[#25D366]/10 border border-[#25D366]/20 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[90%]">
                      <p className="type-body-sm text-white/80">Absolutely! I'm currently taking on new projects. Let's schedule a call to discuss the architecture and timeline. 🤝</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[10px] text-white/40">Just now</span>
                        <div className="flex -space-x-[8px] relative top-[1px]">
                          <Check size={14} strokeWidth={3} className="text-[#25D366]/60" />
                          <Check size={14} strokeWidth={3} className="text-[#25D366]/60" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Link with Separator */}
                <div className="w-full max-w-[440px] mx-auto pt-6 border-t border-white/10 flex justify-center">
                  <PrimaryButton 
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(contact.whatsapp.messageTemplate)}`}
                    target="_blank"
                    className="!h-14 !w-full"
                    icon={<Icon name="Whatsapp" className="w-5 h-5 transition-transform group-hover:scale-110" />}
                  >
                    Start Chat
                  </PrimaryButton>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 p-6 lg:p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl shadow-2xl relative min-h-[465px]"
            >
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="type-heading-3 text-white">Send a Message</h3>
                  <p className="type-body-sm text-white/50">
                    Fill out the form below and I'll get back to you shortly.
                  </p>
                </div>
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
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
                        className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--theme-base)/0.4)] focus:!ring-[hsl(var(--theme-base)/0.2)]"
                      />
                    </div>
                    <div className="space-y-1.5">
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
                        className="form-field !bg-white/[0.03] !border-white/10 focus:!border-[hsl(var(--theme-base)/0.4)] focus:!ring-[hsl(var(--theme-base)/0.2)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
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
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
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
          onClick={() => {
            setActiveMobileMenu(null);
            setShowForm(false);
          }}
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--theme-base)/0.15)] text-[hsl(var(--theme-base))]">
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
