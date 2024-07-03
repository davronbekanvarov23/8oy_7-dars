import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";

function AddTodo() {
  return (
    <div className="card bg-base-100 max-w-96 shadow-xl p-8">
      <Form method="post" className="flex flex-col items-center gap-5">
        <h2 className="text-3xl font-semibold">New Todo</h2>
        <FormInput name="title" type="text" label="Title:" />
        <FormInput name="description" type="text" label="Description:" />
        <FormCheckbox />
        <button className="btn btn-primary btn-block"> Add</button>
      </Form>
    </div>
  );
}

export default AddTodo;
