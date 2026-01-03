type NameInputProps = {
  name: string;
  onNameChange: (name: string) => void;
};

export default function NameInput({ name, onNameChange }: NameInputProps) {
  return (
    <div className="mx-auto mb-8 max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
        Your Name <span className="text-red-500">*</span>
      </label>
      <input
        id="name"
        type="text"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Enter your full name"
      />
    </div>
  );
}

