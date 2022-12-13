type AdminLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  return (
    <section className="mx-auto max-w-screen-xl py-20 px-2 sm:px-4">
      <h1 className="mb-10 text-left text-3xl font-black text-teal-900 lg:text-5xl">
        Suite Administrativa
      </h1>
      <div className="mb-40 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <p className="mt-1 mb-8 max-w-2xl text-sm text-gray-500">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export default AdminLayout;
