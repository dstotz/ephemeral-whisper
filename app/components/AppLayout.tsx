"use client";

import { useEffect, useState } from "react";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

declare global {
  interface Window {
    toggleThemePanel: () => void;
  }
}

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const preferDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(preferDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    window.toggleThemePanel = () => {
      setShowThemePanel(!showThemePanel);
    };
  }, []);

  return (
    <Theme
      accentColor="cyan"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      appearance={darkMode ? "dark" : "light"}
      radius="small"
    >
      {showThemePanel && <ThemePanel />}
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      <main>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              backgroundColor: "white",
              borderRadius: 6,
              boxShadow:
                "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
              padding: 15,
              columnGap: 15,
              alignItems: "center",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 1.3,
            },
          }}
        />
        <Container size="3" p="5" style={{ minHeight: 500 }}>
          {children}
        </Container>
      </main>
      <Footer />
    </Theme>
  );
};
