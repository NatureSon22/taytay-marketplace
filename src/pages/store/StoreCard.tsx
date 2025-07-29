import img from "@/assets/pic.jpg";

type StoreCardProps = {
  storeName: string;
  profilePicture?: string;
};
function StoreCard({ storeName, profilePicture }: StoreCardProps) {
  return (
    <div className="group relative w-full max-w-[300px] border border-slate-100 grid place-items-center gap-7 px-4 py-12 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:border-slate-200 hover:shadow-xs">
      <div className="relative size-30 rounded-full overflow-hidden md:size-36 ">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={profilePicture || img}
          alt="Profile"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <p className="uppercase font-bold text-[0.9rem] text-center text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
        {storeName}
      </p>
    </div>
  );
}

export default StoreCard;
