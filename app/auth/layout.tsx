const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black bg-grid-small-white/[0.2] py-8">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col space-y-6 p-4">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
