import { Icons } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline tracking-tighter">HerCycle</span>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
