"use client";

import { ClientSDK } from "@hcms/core";
import PagesPage from "@hcms/plugin-ui/src/components/PagesPage";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Home() {
  let q = useQuery({
    queryKey: ["pages"],
    queryFn: () => {
      return ClientSDK.call({
        collection: "pages",
        method: "list",
        args: {
          page: 1,
          perPage: 10,
        },
      });
    },
  });

  const action = useMutation({
    mutationFn: async (args: any) => {
      let result = await ClientSDK.call({
        collection: "pages",
        method: "create",
        args,
      });
      return result;
    },
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        onClick={() =>
          action.mutate({
            title: "Test" + Date.now(),
            slug: "test" + Date.now(),
            bodyhtml: "Test" + Date.now(),
          })
        }
      >
        Create
      </button>
      <PagesPage />
      <button onClick={() => q.refetch()}>Refetch</button>
    </div>
  );
}
