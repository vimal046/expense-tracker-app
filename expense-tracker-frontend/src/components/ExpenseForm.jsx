import { useEffect, useState } from "react";

const initialState = {
  title: "",
  amount: "",
  category: "",
  date: "",
  description: "",
};

export default function ExpenseForm({
  initialExpense,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialExpense) {
      setForm({
        title: initialExpense.title || "",
        amount:
          initialExpense.amount !== undefined
            ? String(initialExpense.amount)
            : "",
        category: initialExpense.category || "",
        date: initialExpense.date || "",
        description: initialExpense.description || "",
      });
    } else {
      setForm(initialState);
    }
  }, [initialExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category.trim(),
      date: form.date,
      description: form.description.trim() || null,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          step="0.01"
          required
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
          type="date"
          required
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 disabled:opacity-60"
        >
          {submitting
            ? "Saving..."
            : initialExpense
            ? "Update Expense"
            : "Add Expense"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
