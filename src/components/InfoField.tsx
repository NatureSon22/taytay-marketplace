type InfoFieldProps = {
  label: string;
  value?: string;
};

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      <p className="text-[0.95rem]">{value}</p>
    </div>
  );
}

export default InfoField;
