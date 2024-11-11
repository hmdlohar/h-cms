import { getCollection, getCollectionMenuItem } from "@/lib/collections";
import CollectionPage from "./CollectionPage";

interface IMenuPagesProps {
  params: {
    collectionID: string;
    pageID: string;
  };
}
export default async function MenuPages(props: IMenuPagesProps) {
  const { collectionID, pageID } = await props.params;
  // let collection = await getCollection(collectionID);
  // let menuItem = await getCollectionMenuItem(collectionID, pageID);
  return (
    <div>
      <CollectionPage
        collectionID={collectionID}
        pageID={pageID}
        // menuItem={menuItem}
      />
    </div>
  );
}
