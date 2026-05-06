import re

with open("src/pages/Contact.jsx", "r") as f:
    content = f.read()

# 1. Import MoreVertical
content = content.replace(
    'MessageSquare,',
    'MessageSquare,\n  MoreVertical,'
)

# 2. Add state and ref
state_code = """  const [activeMobileMenu, setActiveMobileMenu] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsSocialMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);"""

content = content.replace(
    'const [activeMobileMenu, setActiveMobileMenu] = React.useState(null);',
    state_code
)

# 3. Replace Compact Secondary Info Block
old_block = """                {/* ── Compact Secondary Info (Phone, Location, Socials) ── */}
                <div className="w-full mt-2 border-t border-white/10 pt-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    {/* Phone */}
                    {phoneItem && (
                      <div className="tooltip-wrapper relative justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCopy(phoneItem.value, "Phone");
                          }}
                          className="group flex flex-col justify-center items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors text-left w-full"
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${copiedLabel === "Phone" ? "bg-[hsl(var(--theme-base)/0.2)] border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]" : "bg-white/5 border-white/10 text-white/50 group-hover:text-white"}`}
                          >
                            {copiedLabel === "Phone" ? (
                              <Check size={14} />
                            ) : (
                              <Phone size={14} />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-medium truncate transition-colors ${copiedLabel === "Phone" ? "text-[hsl(var(--theme-base))]" : "text-white/80 group-hover:text-white"}`}
                            >
                              {copiedLabel === "Phone"
                                ? "Copied!"
                                : phoneItem.value}
                            </p>
                          </div>
                        </button>
                        {isDesktop && (
                          <div className="tooltip-panel !left-4">
                            <span className="tooltip-title">
                              Click to copy Phone
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Email */}
                    {emailItem && (
                      <div className="tooltip-wrapper relative justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCopy(emailItem.value, "Email");
                          }}
                          className="group flex flex-col justify-center items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors text-left w-full"
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${copiedLabel === "Email" ? "bg-[hsl(var(--theme-base)/0.2)] border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]" : "bg-white/5 border-white/10 text-white/50 group-hover:text-white"}`}
                          >
                            {copiedLabel === "Email" ? (
                              <Check size={14} />
                            ) : (
                              <Mail size={14} />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-medium truncate transition-colors ${copiedLabel === "Email" ? "text-[hsl(var(--theme-base))]" : "text-white/80 group-hover:text-white"}`}
                            >
                              {copiedLabel === "Email"
                                ? "Copied!"
                                : emailItem.value}
                            </p>
                          </div>
                        </button>
                        {isDesktop && (
                          <div className="tooltip-panel !left-4">
                            <span className="tooltip-title">
                              Click to copy Email
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Socials */}
                  <div className="flex flex-wrap justify-center items-center gap-3 p-2 pb-0 -mx-2 xl:col-span-2">
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
                          className="!w-12 !h-12 !rounded-full !bg-[hsl(var(--theme-base)/0.1)] !text-[hsl(var(--theme-base))] !border !border-[hsl(var(--theme-base)/0.2)] hover:!bg-[hsl(var(--theme-base)/0.2)]"
                        />
                      );
                    })}
                  </div>"""

new_block = """                {/* ── Compact Secondary Info (Phone, Email, Socials) ── */}
                <div className="w-full mt-2 border-t border-white/10 pt-6 flex items-center justify-center gap-8">
                  {/* Phone */}
                  {phoneItem && (
                    <div className="tooltip-wrapper relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(phoneItem.value, "Phone");
                        }}
                        className="group flex flex-col items-center gap-1.5 p-2 -my-2 rounded-xl hover:bg-white/5 transition-colors text-center"
                      >
                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
                          PHONE
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <p className={`text-sm font-medium transition-colors ${copiedLabel === "Phone" ? "text-[hsl(var(--theme-base))]" : "text-white/80 group-hover:text-white"}`}>
                            {copiedLabel === "Phone" ? "Copied!" : phoneItem.value}
                          </p>
                          {copiedLabel === "Phone" ? (
                            <Check size={12} className="text-[hsl(var(--theme-base))]" />
                          ) : (
                            <Copy size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
                          )}
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
                        className="group flex flex-col items-center gap-1.5 p-2 -my-2 rounded-xl hover:bg-white/5 transition-colors text-center"
                      >
                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
                          EMAIL
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <p className={`text-sm font-medium transition-colors ${copiedLabel === "Email" ? "text-[hsl(var(--theme-base))]" : "text-white/80 group-hover:text-white"}`}>
                            {copiedLabel === "Email" ? "Copied!" : emailItem.value}
                          </p>
                          {copiedLabel === "Email" ? (
                            <Check size={12} className="text-[hsl(var(--theme-base))]" />
                          ) : (
                            <Copy size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
                          )}
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
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{global.labels.socialProfiles}</p>
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
                </div>
              </div>"""

content = content.replace(old_block, new_block)

with open("src/pages/Contact.jsx", "w") as f:
    f.write(content)
