import { type Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Not Found",
  robots: {
    follow: false,
    index: false
  },
  alternates: {
    canonical: "/not-found"
  }
};

export default function NotFound() {
  return (
    <>
      <Header title="Error" subtitle="Not Found"/>
    </>
  );
}