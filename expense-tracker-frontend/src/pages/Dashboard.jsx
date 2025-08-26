import { useEffect, useMemo, useState } from "react";
import api from "../services/api.js";
import ExpenseList from "../components/ExpenseList.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const hasAnyFilter = useMemo(() => {
    return Boolean(filters.category || (filters.startDate && filters.endDate));
  }, [filters]);

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "/expenses";
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category);
      if (filters.startDate && filters.endDate) {
        params.set("startDate", filters.startDate);
        params.set("endDate", filters.endDate);
      }
      if (Array.from(params.keys()).length > 0) {
        url = `/expenses?${params.toString()}`;
      }
      const res = await api.get(url);
      setExpenses(res.data);
    } catch (err) {
      const msg = err.response?.data || "Failed to load expenses";
      setError(typeof msg === "string" ? msg : "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (payload) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/expenses", payload);
      setCreating(false);
      await loadExpenses();
    } catch (err) {
      const msg = err.response?.data || "Failed to create expense";
      setError(typeof msg === "string" ? msg : "Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (payload) => {
    if (!editing) return;
    setLoading(true);
    setError("");
    try {
      await api.put(`/expenses/${editing.id}`, payload);
      setEditing(null);
      await loadExpenses();
    } catch (err) {
      const msg = err.response?.data || "Failed to update expense";
      setError(typeof msg === "string" ? msg : "Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoading(true);
    setError("");
    try {
      await api.delete(`/expenses/${deletingId}`);
      setConfirmOpen(false);
      setDeletingId(null);
      await loadExpenses();
    } catch (err) {
      const msg = err.response?.data || "Failed to delete expense";
      setError(typeof msg === "string" ? msg : "Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (e) => {
    e.preventDefault();
    await loadExpenses();
  };

  const clearFilters = async () => {
    setFilters({ category: "", startDate: "", endDate: "" });
    await loadExpenses();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600">Manage your expenses</p>
        </div>
        <div className="flex items-center gap-2">
          {!creating && !editing && (
            <button
              onClick={() => setCreating(true)}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500"
            >
              Add Expense
            </button>
          )}
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading && (
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      )}

      <div className="bg-white p-4 shadow rounded dark:bg-gray-900">
        <form
          onSubmit={applyFilters}
          className="grid grid-cols-1 md:grid-cols-5 gap-3"
        >
          <input
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
            placeholder="Category"
            className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((f) => ({ ...f, startDate: e.target.value }))
            }
            className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((f) => ({ ...f, endDate: e.target.value }))
            }
            className="border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasAnyFilter}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-60 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Clear
          </button>
        </form>
      </div>

      {(creating || editing) && (
        <div className="bg-white p-4 shadow rounded dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-2">
            {editing ? "Edit Expense" : "Add Expense"}
          </h2>
          <ExpenseForm
            initialExpense={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => {
              setCreating(false);
              setEditing(null);
            }}
            submitting={loading}
          />
        </div>
      )}

      <div className="bg-white p-4 shadow rounded dark:bg-gray-900">
        <ExpenseList
          expenses={expenses}
          onEdit={setEditing}
          onDelete={requestDelete}
        />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeletingId(null);
        }}
        confirming={loading}
      />
    </div>
  );
}
