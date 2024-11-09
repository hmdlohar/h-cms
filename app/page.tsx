"use client";

import { ClientSDK } from "@/services/ClientSDK";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  let q = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return ClientSDK.call({
        collection: "post",
        method: "list",
      });
    },
  });

  const action = useMutation({
    mutationFn: async (args: any) => {
      let result = await ClientSDK.call({
        collection: "post",
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
            tags: "test,test2",
          })
        }
      >
        Create
      </button>
      <button onClick={() => q.refetch()}>Refetch</button>
    </div>
  );
}
