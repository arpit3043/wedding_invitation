import { Suspense } from "react";
import { WeddingExperience } from "@/components/WeddingExperience";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-ivory paper-texture">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-wine">
            Arpit & Muskan
          </p>
        </div>
      }
    >
      <WeddingExperience />
    </Suspense>
  );
}
