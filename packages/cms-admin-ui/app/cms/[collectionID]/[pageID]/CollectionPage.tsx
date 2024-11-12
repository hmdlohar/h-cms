"use client";
import NoSSR from "@/common/NoSSR";
import CRUDTable from "@/components/CRUD/CRUDTable";
import { getCollectionMenuItem } from "@/lib/collections";

interface ICollectionPageProps {
  collectionID: string;
  pageID: string;
  //   menuItem: ICollectionMenuItem;
}
export default function CollectionPage(props: ICollectionPageProps) {
  let menuItem = getCollectionMenuItem(props.collectionID, props.pageID);
  console.log(menuItem);
  return (
    <div>
      {menuItem?.CRUDSchema && (
        <CRUDTable collectionID={props.collectionID} menuItem={menuItem} />
      )}
      {menuItem?.component && (
        <NoSSR>
          <menuItem.component
            collectionID={props.collectionID}
            pageID={props.pageID}
          />
        </NoSSR>
      )}
    </div>
  );
}
