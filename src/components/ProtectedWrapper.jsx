// src/components/ProtectedWrapper.jsx
'use client';

import { usePathname } from "next/navigation";
import ProtectedPage from "./ProtectedPage";

export default function ProtectedWrapper({ children }) {
  const pathname = usePathname();
  const isPublic = pathname === "/sign-in";

  if (isPublic) {
    return children;
  }

  return <ProtectedPage>{children}</ProtectedPage>;
}
