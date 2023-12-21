import { Metadata } from "next";
import Changelog from "~/components/Changelog";
import Header from "~/components/Header";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

export default function Home() {
  return (
    <>
      <Header subtitle="Full-Stack Developer"/>

      <div className="grid lg:grid-cols-2 gap-3 my-3" data-nosnippet="true">
        <div className="flex flex-col gap-3 items-center lg:items-start p-3 rounded bg-neutral-900 text-white">
          <div>
            <h1 className="font-semibold text-3xl">Social</h1>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start divide-x divide-neutral-600">
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#008FFE] hover:text-[#0062FE]" href="https://bsky.app/profile/lxgaming.me" target="_blank" rel="noopener">Bluesky</a>
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#6364FF] hover:text-[#563ACC]" href="https://fosstodon.org/@lxgaming" target="_blank" rel="noopener">Mastodon</a>
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#9146FF] hover:text-[#782DE6]" href="https://twitch.tv/lx_gaming" target="_blank" rel="noopener">Twitch</a>
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#FF0000] hover:text-[#E60000]" href="https://www.youtube.com/@lx_gaming" target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center lg:items-end p-3 rounded bg-neutral-900 text-white">
          <div>
            <h1 className="font-semibold text-3xl">Sponsor</h1>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end divide-x divide-neutral-600">
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#BFBFBF] hover:text-[#A6A6A6]" href="https://github.com/sponsors/LXGaming" target="_blank" rel="noopener">GitHub</a>
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#FF5E5B] hover:text-[#E64542]" href="https://ko-fi.com/lxgaming" target="_blank" rel="noopener">Ko-fi</a>
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#FF424D] hover:text-[#E62934]" href="https://www.patreon.com/lxgaming" target="_blank" rel="noopener">Patreon</a>
            <a className="font-semibold text-xl px-3 first:pl-0 last:pr-0 transition duration-300 text-[#635BFF] hover:text-[#4A42E6]" href="https://donate.stripe.com/14kcOf7H2cIdd2gdQQ" target="_blank" rel="noopener">Stripe</a>
          </div>
        </div>
      </div>

      <Changelog username="LXGaming"/>
    </>
  );
}