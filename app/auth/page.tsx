import Image from "next/image";
import img from "@/app/Assets/Logo.jpeg";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex items-center gap-8 flex-col justify-center h-screen  w-full">
      <span className="flex items-center gap-4">
        <Image className="w-20 rounded-full" src={img} alt="alt" />
        <h4 className="font-bold">Streamly</h4>
      </span>
      <Button className="h-20 w-64 rounded">Authenticated User</Button>
    </div>
  );
}
