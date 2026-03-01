import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem("portfolio-role") || "product_engineer_hybrid";
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/portfolio-content.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && data.roles && !data.roles[activeRole]) {
      console.warn(
        `Invalid role "${activeRole}" found in localStorage. Resetting to default.`,
      );
      setActiveRole("product_engineer_hybrid");
    }
  }, [data, activeRole]);

  useEffect(() => {
    localStorage.setItem("portfolio-role", activeRole);
  }, [activeRole]);

  const content = useMemo(() => {
    if (!data) return null;

    // Support both old schema (data.roles) and direct role access
    const rolesMap = data.roles || data;
    const roleData =
      rolesMap[activeRole] ||
      rolesMap["product_engineer_hybrid"] ||
      Object.values(rolesMap)[0];

    if (!roleData) return null;

    // The new JSON schema has no "common" block — all data lives in the role.
    // Build a unified content object with safe fallbacks.
    const globalDefaults = {
      socialLinks: [],
      resume: { label: "Download Resume", file: "#" },
      labels: {
        socialProfiles: "Social Profiles",
        quickLinks: "Quick Links",
        loading: "Loading...",
        moreOptions: "More options",
        present: "Present",
      },
    };

    const contactDefaults = {
      info: [],
      whatsapp: { label: "WhatsApp Me", hint: "Quickest way to connect" },
      form: {
        fields: {
          name: { label: "Name", placeholder: "Your full name" },
          email: { label: "Email", placeholder: "your@email.com" },
          message: {
            label: "Message",
            placeholder: "Tell me about the opportunity...",
          },
        },
      },
      prompts: {
        formal: "Interested in discussing a formal opportunity?",
        informal: "Want to connect quickly?",
        switchToEmail: "Email Instead",
        switchToWhatsApp: "Switch to WhatsApp",
      },
      labels: {
        connect: "Connect",
        socialProfiles: "Social Profiles",
        location: "Location",
        sendMail: "Send Mail",
        callNow: "Call Now",
        copy: "Copy",
        whatsAppShort: "WhatsApp",
      },
    };

    // Merge role-level global on top of defaults
    const mergedGlobal = {
      ...globalDefaults,
      ...roleData.global,
      labels: {
        ...globalDefaults.labels,
        ...roleData.global?.labels,
      },
    };

    // Merge role-level contact on top of defaults
    const mergedContact = {
      ...contactDefaults,
      ...roleData.contact,
      whatsapp: {
        ...contactDefaults.whatsapp,
        ...roleData.contact?.whatsapp,
      },
      form: {
        ...contactDefaults.form,
        ...roleData.contact?.form,
        fields: {
          ...contactDefaults.form.fields,
          ...roleData.contact?.form?.fields,
        },
      },
      labels: {
        ...contactDefaults.labels,
        ...roleData.contact?.labels,
      },
    };

    // Name — support in-role home.name or hardcoded fallback
    const name = roleData.home?.name || { first: "Rajat", last: "Gulati" };

    return {
      ...roleData,
      home: {
        ...roleData.home,
        name,
      },
      global: mergedGlobal,
      contact: mergedContact,
      notFound: roleData.notFound || {
        title: "404",
        message: "Oops! Page not found",
        linkLabel: "Return to Home",
      },
    };
  }, [data, activeRole]);

  const value = {
    content,
    loading,
    error,
    activeRole,
    setActiveRole,
    roles: data ? Object.keys(data.roles || data) : [],
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
