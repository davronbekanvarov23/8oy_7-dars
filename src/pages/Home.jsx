//redux
import { useSelector } from "react-redux";

//rrd

//custum hooks
import { useCollection } from "../hooks/useCollection";

//components
import TodoList from "../components/TodoList";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("Todos", ["uid", "==", user.uid]);
  return (
    <div className="align-element">
      {" "}
      <TodoList data={data} />
    </div>
  );
}

export default Home;
