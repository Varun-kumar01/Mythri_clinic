// frontend/src/pages/FormPage.jsx
import { useState } from "react";
import api from "../api/client";

export default function FormPage() {
  const [form, setForm] = useState({ title: "", description: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/forms", form);
    alert("Saved");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
      />
      <button type="submit">Submit</button>
    </form>
  );
}