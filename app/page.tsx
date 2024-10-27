import { CoverEditor } from '@/components/editor/cover-editor';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Blog Cover Generator</h1>
            <p className="text-lg text-muted-foreground">
              Create beautiful, professional blog covers in seconds
            </p>
          </header>
          <CoverEditor />
        </div>
      </div>
    </main>
  );
}