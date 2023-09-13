"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header(props: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 items-center p-3 rounded bg-neutral-900 text-white" data-nosnippet="true">
      <div className="flex p-4">
        { pathname !== "/" && (
          <Link href="/">
            <Image src="/img/home.svg" alt="Home" width={32} height={32}/>
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="font-semibold text-3xl">{props.title ?? "Alex Thomson"}</h1>
        <p className="text-xl text-gray-400">{props.subtitle}</p>
      </div>
      <div className="flex justify-end p-4">
        <a href="https://github.com/LXGaming" target="_blank" rel="noopener">
          <Image src="/img/github.svg" alt="GitHub" width={32} height={32} className="w-full h-[32px]" />
        </a>
      </div>
    </div>
  );
}

export interface HeaderProps {
  title?: string;
  subtitle?: string;
}