import { type Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Contributions",
  robots: {
    follow: false,
    index: false
  },
  alternates: {
    canonical: "/contributions"
  }
};

export default function Contributions() {
  return (
    <>
      <Header subtitle="Contributions"/>

      <div className="flex justify-center my-3 p-3">
        <a href="https://www.abuseipdb.com/user/55258" target="_blank" rel="noopener" title="AbuseIPDB is an IP address blacklist for webmasters and sysadmins to report IP addresses engaging in abusive behavior on their networks">
          <Image src="https://www.abuseipdb.com/contributor/55258.svg" alt="AbuseIPDB Contributor Badge" width={400} height={100} priority={true}/>
        </a>
      </div>
    </>
  );
}