import React from "react";
import useAPI from "../hooks/useAPI";
import { ClientSDK } from "hcms-core";

interface ICounterPageProps {}
export default function CounterPage(props: ICounterPageProps) {
  let inc = useAPI(
    async () => {
      await ClientSDK.call({
        collection: "counter",
        method: "increaseCount",
        args: {},
      });
      count.refetch();
    },
    { doNotFetch: true }
  );
  let dec = useAPI(
    async () => {
      await ClientSDK.call({
        collection: "counter",
        method: "decreaseCount",
        args: {},
      });
      count.refetch();
    },
    { doNotFetch: true }
  );

  let count = useAPI(async () => {
    return ClientSDK.call({
      collection: "counter",
      method: "getCount",
      args: {},
    });
  });

  return (
    <div className="flex flex-col gap-4">
      Counter will fetch count from database.
      <div className="flex gap-4 items-center justify-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={dec.refetch}
        >
          Decrease Count
        </button>

        {(count.loading || inc.loading || dec.loading) && <div>Loading...</div>}
        {count.data && (
          <div className="text-2xl font-bold text-center">
            {count.data?.count}
          </div>
        )}
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={inc.refetch}
        >
          Increase Count
        </button>
      </div>
    </div>
  );
}
