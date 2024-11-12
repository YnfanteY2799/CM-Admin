import { NoiseWaves } from "@/components";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

import type { ReactNode } from "react";

export default function signInPage(): ReactNode {
  return (
    <NoiseWaves blur={20}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <CardHeader className=""></CardHeader>
          <CardBody className=""></CardBody>
          <CardFooter className=""></CardFooter>
        </Card>
      </div>
    </NoiseWaves>
  );
}
