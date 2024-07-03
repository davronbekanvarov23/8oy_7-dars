// import Pagination from "../components/Pagination";

import { useActionData } from "react-router-dom";
import { AddTodo } from "../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/fireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let description = formData.get("description");
  let completed = formData.get("completed");
  return { title, completed, description };
};

function Create() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);

  // const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  useEffect(() => {
    if (userData) {
      const newTodo = {
        title: userData.title,
        description: userData.description,
        completed: userData.completed == "on" ? true : false,
        uid: user.uid,
      };

      addDoc(collection(db, "Todos"), newTodo)
        .then(() => {
          toast.success("New todo added");
        })
        .catch((error) => toast.error(error.message));
    }
  }, [userData]);

  return (
    <div className="align-element">
      <AddTodo />

      {/* <Pagination items={items} itemsPerPage={9}/> */}
    </div>
  );
}

export default Create;
