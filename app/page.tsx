import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Button asChild>
        <Link href='/invoices'>
          Get started
        </Link>
      </Button>
      <Button asChild>
        <Link href='/on-the-go-invoice'>
          Invoice on the go
        </Link>
      </Button>
      <p>main page</p>
    </main>
  );
}
