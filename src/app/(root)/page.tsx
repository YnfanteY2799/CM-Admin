import { Button } from "@/components";
import { BackgroundBeamsWithCollision } from "@/components/ui/BackgroundBeams";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="p-4">
        <Button size="sm">Something</Button>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
