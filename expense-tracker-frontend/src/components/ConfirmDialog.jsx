export default function ConfirmDialog({
  open,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirming = false,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white dark:bg-gray-900 rounded shadow-lg w-full max-w-sm mx-4">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="px-4 py-4">
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            disabled={confirming}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500 disabled:opacity-60"
            disabled={confirming}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
