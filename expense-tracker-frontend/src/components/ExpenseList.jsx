export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400">No expenses found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded dark:bg-gray-900">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="text-left px-4 py-2">Title</th>
            <th className="text-left px-4 py-2">Amount</th>
            <th className="text-left px-4 py-2">Category</th>
            <th className="text-left px-4 py-2">Date</th>
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr
              key={e.id}
              className="border-t border-gray-200 dark:border-gray-800"
            >
              <td className="px-4 py-2">{e.title}</td>
              <td className="px-4 py-2">{Number(e.amount).toFixed(2)}</td>
              <td className="px-4 py-2">{e.category}</td>
              <td className="px-4 py-2">{e.date}</td>
              <td className="px-4 py-2">{e.description}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(e)}
                  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(e.id)}
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
