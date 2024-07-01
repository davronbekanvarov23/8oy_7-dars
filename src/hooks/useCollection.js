import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../firebase/fireBaseConfig";

export const useCollection = (collectionName, whereData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (whereData[2]) {
      const q = query(collection(db, collectionName), where(...whereData));
      const getData = async () => {
        const data = [];
        const quarySnapshot = await getDocs(q);
        quarySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
      };
      getData();
    }
  }, [collectionName, whereData[2]]);
  return { data };
};
