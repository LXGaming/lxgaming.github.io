import { Metadata } from "next";
import Header from "~/components/Header";

export const metadata: Metadata = {
  title: "Not Found",
  robots: {
    follow: false,
    index: false
  }
};

export default function NotFound() {
  return (
    <>
      <Header title="Error" subtitle="Not Found"/>
    </>
  );
}