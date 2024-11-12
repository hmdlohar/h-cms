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
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      Counter will fetch count from database.
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px",
            borderRadius: "8px",
          }}
          onClick={dec.refetch}
        >
          Decrease Count
        </button>

        {(count.loading || inc.loading || dec.loading) && <div>Loading...</div>}
        {count.data && (
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {count.data?.count}
          </div>
        )}
        <button
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px",
            borderRadius: "8px",
          }}
          onClick={inc.refetch}
        >
          Increase Count
        </button>
      </div>
    </div>
  );
}
