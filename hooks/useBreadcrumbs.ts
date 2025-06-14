"use client";

import { FakeData } from "@/app/data/FakeData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Breadcrumb item type
interface BreadcrumbItem {
  label: string;
  href: string;
}

async function getCourseById(id: string) {
  const courses = FakeData.getCourses();
  const course = courses.find((item) => String(item.id) === id);
  return course ?? null;
}

async function resolveBreadcrumbName(segment: string, id: string) {
  switch (segment) {
    case "course":
      const course = await getCourseById(id);
      return course?.name ?? id;
    default:
      return id;
  }
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const paths = pathname.split("/").filter(Boolean);

    const resolveAll = async () => {
      const result: BreadcrumbItem[] = [];
      let hrefAccumulator = "";

      for (let i = 0; i < paths.length; i++) {
        const segment = paths[i];
        const nextSegment = paths[i + 1];

        if (["course"].includes(segment) && nextSegment) {
          hrefAccumulator += `/${segment}`;
          result.push({ label: capitalize(segment), href: hrefAccumulator });

          hrefAccumulator += `/${nextSegment}`;
          const name = await resolveBreadcrumbName(segment, nextSegment);
          result.push({ label: name, href: hrefAccumulator });

          i++; // skip id
        } else {
          hrefAccumulator += `/${segment}`;
          result.push({ label: capitalize(segment), href: hrefAccumulator });
        }
      }

      setBreadcrumbs(result);
    };

    resolveAll();
  }, [pathname]);

  return breadcrumbs;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
