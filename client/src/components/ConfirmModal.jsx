const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Delete User
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;