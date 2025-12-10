import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-green-600 text-white rounded-lg space-y-3">
      <div className="text-xl font-semibold">Count: {count}</div>

      <div className="space-x-2">
        <button
          className="px-3 py-1 bg-white text-green-600 rounded"
          onClick={() => setCount(count + 1)}
        >
          + Increment
        </button>

        <button
          className="px-3 py-1 bg-white text-green-600 rounded"
          onClick={() => setCount(count - 1)}
        >
          − Decrement
        </button>
      </div>
    </div>
  );
}
