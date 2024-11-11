"use client";
import CRUDTable from "@/components/CRUD/CRUDTable";
import { getCollectionMenuItem } from "@/lib/collections";

interface ICollectionPageProps {
  collectionID: string;
  pageID: string;
  //   menuItem: ICollectionMenuItem;
}
export default function CollectionPage(props: ICollectionPageProps) {
  let menuItem = getCollectionMenuItem(props.collectionID, props.pageID);
  return (
    <div>
      {menuItem?.CRUDSchema && (
        <CRUDTable collectionID={props.collectionID} menuItem={menuItem} />
      )}
    </div>
  );
}
