"use client";

import MainLayout from "./MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div>
        <div className="">
          <h1 className="text-4xl font-bold mb-8">Welcome to H CMS</h1>

          <div className="grid gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Plugin-Based Architecture
              </h2>
              <p className="text-gray-600">
                H CMS is built with a flexible plugin system that allows you to
                extend and customize functionality. Add new features and
                capabilities through plugins while maintaining a clean core.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Content Management
              </h2>
              <p className="text-gray-600">
                Easily manage your content with our intuitive interface. Create,
                edit and organize your content types with a powerful schema
                system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Developer Friendly
              </h2>
              <p className="text-gray-600">
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
