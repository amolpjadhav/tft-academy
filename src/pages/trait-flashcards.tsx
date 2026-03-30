import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TraitFlashcardsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/flashcards");
  }, [router]);
  return null;
}
