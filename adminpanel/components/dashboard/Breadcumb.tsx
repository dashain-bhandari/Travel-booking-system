"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcumb({ links }: any) {
  return (
    <nav
      className="flex mb-4"
      aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {links.map((link: any, index: any) => (
          <li
            key={index}
            className="inline-flex items-center text-foreground">
            {index !== 0 && (
              <div className="flex items-center">
                <ChevronRight className="h-5 w-5 " />
              </div>
            )}
            <Link
              href={link.href}
              className={`${link.isActive ? " text-primary-600" : ""} inline-flex items-center font-medium  hover:text-primary-600 `}>
              {link.icon && <link.icon className="mr-1 h-4 w-4" />}
              {link.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
