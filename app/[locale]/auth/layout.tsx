export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md ">
        {children}
      </div>
      <footer>
        <p className="text-center text-xs text-muted-foreground mt-4">
          &copy; {new Date().getFullYear()} SACAS - Sistema de Gestión Educativa
        </p>
      </footer>
    </div>
  );
}
