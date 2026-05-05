"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import UploadContentForm from "@/features/teacher/UploadContentForm";

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "teacher")) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return null;
  if (!user || user.role !== "teacher") return null;

  return <UploadContentForm />;
}
