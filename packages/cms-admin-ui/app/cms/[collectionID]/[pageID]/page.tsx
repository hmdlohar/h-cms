"use client";
import MainLayout from "@/app/MainLayout";
import CollectionPage from "./CollectionPage";
import { use } from "react";

interface IMenuPagesProps {
  params: Promise<{
    collectionID: string;
    pageID: string;
  }>;
}
export default function MenuPages(props: IMenuPagesProps) {
  const { collectionID, pageID } = use<any>(props.params as any);
  // let collection = await getCollection(collectionID);
  // let menuItem = await getCollectionMenuItem(collectionID, pageID);
  return (
    <MainLayout>
      <CollectionPage
        collectionID={collectionID}
        pageID={pageID}
        // menuItem={menuItem}
      />
    </MainLayout>
  );
}
