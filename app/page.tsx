import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HomeImage from '../assets/Receipt_re_fre3.png'
import Logo from '../assets/log2.webp'

export default function Home() {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6 '>
        {/* <div>
          logo
        </div> */}
         <Image className="w-12 h-12 rounded-xl" src={Logo} alt='logo' />
      </header>
      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center'>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            Free Invoice app
          </h1>
          <p className='leading-loose max-w-md mt-4 '>
            Welcome to your reliable invoice app trusted by many. This invoice app enables you to instantly create unlimited amount of invoices
            and effectively keep track of all of them. Invoices can be downloaded as PDF directly from your web browser.
          </p>
          <Button className="mt-4" asChild><Link href='/invoices'>Get started</Link></Button>
        </div>
        <Image src={HomeImage} alt='landing' className='hidden lg:block ' />
      </section>
      
      
    </main>
  );
}
