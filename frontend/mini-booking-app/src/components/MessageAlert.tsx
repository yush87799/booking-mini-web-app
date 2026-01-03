import type { MessageType } from "@/types";

type MessageAlertProps = {
  msg: MessageType;
};

export default function MessageAlert({ msg }: MessageAlertProps) {
  return (
    <div className="mx-auto mb-6 max-w-2xl">
      <div
        className={`rounded-xl p-4 ${
          msg.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
        }`}
      >
        <div className="flex items-center">
          <span className="mr-2 text-xl">
            {msg.type === "success" ? "✅" : "❌"}
          </span>
          <span className="font-medium">{msg.text}</span>
        </div>
      </div>
    </div>
  );
}

