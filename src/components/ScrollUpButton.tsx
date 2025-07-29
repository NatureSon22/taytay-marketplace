import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollUpButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);
  }, []);

  const handleScrollPosition = () => {
    const position = window.pageYOffset;
    setShowButton(position > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={` right-7 shadow-2xl cursor-pointer bottom-8 size-16 grid place-items-center rounded-full bg-100 z-10 md:right-10 md:bottom-10 md:size-20  ${
        showButton ? "fixed" : "hidden"
      } `}
      onClick={scrollToTop}
    >
      <ChevronUp className="size-8 text-white md:size-10" />
    </div>
  );
}

export default ScrollUpButton;
