import { getCollection } from "@/lib/collections";
import React from "react";

interface ICMSPageProps {
  params: {
    collectionID: string;
  };
}
export default async function CMSPage(props: ICMSPageProps) {
  let { collectionID } = await props.params;
  let collection = getCollection(collectionID);
  console.log(collection, "collectionID", collectionID);
  return (
    <div>
      <h1>CMSPage</h1>
      <p>
        Collection ID: {collectionID} collection: {collection?.name}
      </p>
    </div>
  );
}
