type SummaryCardProps = {
  title: string;
  count: number;
  icon?: React.ReactNode;
  color?: string;      
  iconBg?: string;    
  iconColor?: string;   
  textColor?: string;
};

function SummaryCard({
  title,
  count,
  icon,
  color = "bg-white",
  iconBg = "bg-gray-100",
  iconColor = "text-gray-600",
  textColor = "text-gray-600",
}: SummaryCardProps) {
  return (
    <div className={`p-5 flex items-center gap-4 ${color}`}>
      <div className="flex-shrink-0">
        <div className={`text-3xl rounded-full h-16 w-16 flex items-center justify-center ${iconBg} ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <p className={`text-[40px] font-bold ${textColor}`}>{count}</p>
        <p className={`text-[18px] ${textColor}`}>{title}</p>
      </div>
    </div>
  );
}

export default SummaryCard;

