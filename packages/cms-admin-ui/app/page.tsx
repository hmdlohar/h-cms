"use client";

import MainLayout from "./MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div>
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Welcome to H CMS
          </h1>

          <div style={{ display: "grid", gap: "2rem" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Plugin-Based Architecture
              </h2>
              <p style={{ color: "gray" }}>
                H CMS is built with a flexible plugin system that allows you to
                extend and customize functionality. Add new features and
                capabilities through plugins while maintaining a clean core.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Content Management
              </h2>
              <p style={{ color: "gray" }}>
                Easily manage your content with our intuitive interface. Create,
                edit and organize your content types with a powerful schema
                system.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Developer Friendly
              </h2>
              <p style={{ color: "gray" }}>
                Built with modern technologies and best practices. Extend
                functionality using TypeScript, React and a well-documented API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
