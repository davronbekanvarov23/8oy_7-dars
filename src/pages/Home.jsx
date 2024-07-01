import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("Todos", ["uid", "==", user.uid]);
  return (
    <div className="align-element">
      {!data && <span className="loading loading-spinner text-primary"></span>}
      {data &&
        data.map((item) => {
          return item.title;
        })}
    </div>
  );
}

export default Home;
