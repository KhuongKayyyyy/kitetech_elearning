"use client";

import { FakeData } from "@/app/data/FakeData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Breadcrumb item type
interface BreadcrumbItem {
  label: string;
  href: string;
}

// Async resolvers for known segments
async function resolveBreadcrumb(segment: string, id: string): Promise<string> {
  switch (segment) {
    case "course": {
      const courses = FakeData.getCourses();
      const course = courses.find((item) => String(item.id) === id);
      return course?.name ?? id;
    }
    case "lesson": {
      const lessons = FakeData.getClassSections();
      const lesson = lessons.find((item) => String(item.id) === id);
      return lesson?.name ?? id;
    }
    case "content": {
      const materials = FakeData.getClassSectionMaterial();
      const material = materials.find((item) => String(item.id) === id);
      return material?.material ?? id;
    }
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

        if (nextSegment && await hasResolver(segment)) {
          hrefAccumulator += `/${segment}`;
          // Only push for 'course', skip for 'lesson' and 'content'
          if (segment !== "lesson" && segment !== "content") {
            result.push({ label: capitalize(segment), href: hrefAccumulator });
          }

          hrefAccumulator += `/${nextSegment}`;
          const name = await resolveBreadcrumb(segment, nextSegment);
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

async function hasResolver(segment: string) {
  return ["course", "lesson", "content"].includes(segment);
}
