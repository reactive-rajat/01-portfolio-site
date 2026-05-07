import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { themes } from "../theme";
import { getIcon } from "../utils/iconMap";

export function PageLayout(props) {
  const themeName = props.themeName;
  const title = props.title;
  const letter = props.letter;
  const icon = props.icon;
  const children = props.children;
  const left = props.left;
  const right = props.right;
  const description = props.description;
  const action = props.action;

  if (!themeName) {
    return null;
  }

  const styles = themes[themeName];
  const titleWords = title.split(" ");

  const hasSplit = left || right;
  let rightContent = children;

  if (hasSplit) {
    if (right) {
      rightContent = right;
    }
  }

  const BackgroundIcon = icon ? getIcon(icon) : null;

  // Helper for mouse enter
  function handleMouseEnter(e) {
    e.currentTarget.style.boxShadow = "0 0 25px 2px var(--hover-glow)";
    e.currentTarget.style.borderColor = "var(--hover-glow)";
  }

  // Helper for mouse leave
  function handleMouseLeave(e) {
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = "";
  }

  return (
    <main className="min-h-[calc(100svh-20rem)] pb-10 lg:pb-0 pt-4 lg:pt-0 lg:min-h-[100svh] animated-gradient-bg noise-overlay overflow-x-hidden overflow-y-auto lg:overflow-hidden">
      <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none" />

      <div
        className={
          "orb " +
          styles.orb +
          " w-[600px] h-[600px] -top-64 -right-64 animate-float-slow"
        }
      />
      <div
        className={
          "orb " +
          styles.orb +
          " w-96 h-96 bottom-0 -left-48 animate-float-delayed opacity-50"
        }
      />

      <div
        className="page-shell relative z-10 min-h-[calc(100svh-20rem)] lg:min-h-[100svh] px-1 py-16 md:py-20 lg:px-16 grid items-center"
        style={{
          "--accent": "hsl(var(--" + themeName + "))",
          "--theme-base": "var(--" + themeName + ")",
        }}
      >
        <div className="max-w-6xl mx-auto page-enter w-full px-5">
          {hasSplit ? (
            <div className="page-stack flex flex-col gap-10 lg:gap-14 w-full">
              {/* ── Hero Header ── */}
              <div className="page-header flex-col items-start flex gap-6 mb-4">
                {/* Row: back button + title */}
                <div className="relative inline-flex w-fit items-center gap-6">
                  <Link
                    to="/"
                    className={
                      "page-back group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border transition-all duration-300 hover:scale-110 shrink-0 " +
                      styles.border +
                      " " +
                      styles.bg
                    }
                    style={{
                      "--hover-glow": "hsl(var(--" + themeName + "))",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ArrowLeft
                      className={"w-6 h-6 transition-transform " + styles.text}
                    />
                  </Link>
                  <h1 className="type-page-title">
                    {titleWords.map(function (word, i) {
                      return (
                        <span key={i}>
                          {i === titleWords.length - 1 ? (
                            <span className={styles.text}>
                              {word[0].toUpperCase() + word.slice(1)}
                            </span>
                          ) : (
                            <span className="text-foreground">
                              {word[0].toUpperCase() + word.slice(1) + " "}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </h1>

                  {/* ── Fixed decorative page icon — perfectly aligned behind heading ── */}
                  <div className="absolute left-[105%] -top-5 pointer-events-none -z-10 flex justify-center">
                    <div className="w-24 h-24 mix-blend-screen opacity-[0.10]">
                      {BackgroundIcon ? (
                        <BackgroundIcon
                          className={"w-full h-full " + styles.text}
                          strokeWidth={1.1}
                        />
                      ) : (
                        <span
                          className={
                            "page-letter text-[6rem] lg:text-[8rem] font-black leading-none block " +
                            styles.text
                          }
                        >
                          {letter}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional simple description paragraph */}
                {description && (
                  <p className="type-body-lg text-white/60 max-w-2xl">
                    {description}
                  </p>
                )}

                {/* Optional action row (buttons / social links etc.) */}
                {action && (
                  <div className="flex flex-wrap items-center gap-3">
                    {action}
                  </div>
                )}

                {/* Complex left-column intro (About page style) */}
                {left && (
                  <div className="flex flex-col gap-6 w-full max-w-3xl">
                    <div className="page-intro-content w-full">{left}</div>
                  </div>
                )}
              </div>

              <div className="page-main-content w-full">{rightContent}</div>
            </div>
          ) : (
            <>
              <div className="page-header flex flex-col gap-6 mb-10 md:mb-12">
                {/* Row: back button + title */}
                <div className="inline-flex relative w-fit items-center gap-6">
                  <Link
                    to="/"
                    className={
                      "page-back group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border transition-all duration-300 hover:scale-110 shrink-0 " +
                      styles.border +
                      " " +
                      styles.bg
                    }
                    style={{
                      "--hover-glow": "hsl(var(--" + themeName + "))",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ArrowLeft
                      className={"w-6 h-6 transition-transform " + styles.text}
                    />
                  </Link>

                  <h1 className="type-page-title">
                    {titleWords.map(function (word, i) {
                      return (
                        <span key={i}>
                          {i === titleWords.length - 1 ? (
                            <span className={styles.text}>
                              {word[0].toUpperCase() + word.slice(1)}
                            </span>
                          ) : (
                            <span className="text-foreground">
                              {word[0].toUpperCase() + word.slice(1) + " "}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </h1>

                  {/* ── Fixed decorative page icon — perfectly aligned behind heading ── */}
                  <div className="absolute left-[108%] -top-2 pointer-events-none -z-10 flex justify-center">
                    <div className="w-20 h-20 mix-blend-screen opacity-[0.10]">
                      {BackgroundIcon ? (
                        <BackgroundIcon
                          className={"w-full h-full " + styles.text}
                          strokeWidth={1.1}
                        />
                      ) : (
                        <span
                          className={
                            "page-letter text-[6rem] lg:text-[8rem] font-black leading-none block " +
                            styles.text
                          }
                        >
                          {letter}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional description */}
                {description && (
                  <p className="type-body-lg text-white/60 max-w-2xl">
                    {description}
                  </p>
                )}

                {/* Optional action */}
                {action && (
                  <div className="flex flex-wrap items-center gap-3">
                    {action}
                  </div>
                )}

                {/* headerContent (Portfolio page thumbnail bar etc.) */}
                {props.headerContent && (
                  <div className="w-full mt-2">{props.headerContent}</div>
                )}
              </div>

              <div className="page-content">{children}</div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
