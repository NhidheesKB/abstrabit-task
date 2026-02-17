import { Suspense } from "react";
import FormHandller from "./Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <h1></h1>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <FormHandller />
        </Suspense>
      </div>
    </div>
  );
}
