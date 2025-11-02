"use client";

import Link from "next/link";
import { navItems, NavItem } from "@/app/data/navData";

export default function NavBar() {
  return (
    <nav className="flex space-x-4 bg-red-700 text-white p-4 justify-center">
      {navItems.map((item: NavItem) => (
        <Link key={item.path} href={item.path}>
          <button className=" hover:bg-red-800 hover:underline px-4 py-2 rounded">
            {item.name}
          </button>
        </Link>
      ))}
    </nav>
  );
}
