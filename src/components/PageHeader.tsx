type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <div className="py-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );
}

export default PageHeader;
