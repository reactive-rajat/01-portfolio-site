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
    if (data && !data.roles[activeRole]) {
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

    // Use a safe fallback for roleData
    const roleData =
      data.roles[activeRole] ||
      data.roles["product_engineer_hybrid"] ||
      Object.values(data.roles)[0];
    const common = data.common;

    if (!roleData) return null;

    return {
      ...roleData,
      home: {
        ...roleData.home,
        name: data.common.name,
      },
      global: {
        ...common.global,
        ...roleData.global,
        labels: {
          ...common.global.labels,
          ...roleData.global?.labels,
        },
      },
      contact: {
        ...common.contact,
        ...roleData.contact,
        whatsapp: {
          ...common.contact.whatsapp,
          ...roleData.contact?.whatsapp,
        },
        form: {
          ...common.contact.form,
          ...roleData.contact?.form,
          fields: {
            ...common.contact.form.fields,
            ...roleData.contact?.form?.fields,
          },
        },
      },
      notFound: data.common.notFound,
    };
  }, [data, activeRole]);

  const value = {
    content,
    loading,
    error,
    activeRole,
    setActiveRole,
    roles: data ? Object.keys(data.roles) : [],
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
