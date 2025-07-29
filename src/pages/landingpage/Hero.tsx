import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import sliderImage1 from "@/assets/slider1.png";
import sliderImage2 from "@/assets/slider2.png";
import sliderImage3 from "@/assets/slider3.png";
import heroLogo from "@/assets/hero-logo.png";
import PadLayout from "@/layouts/PadLayout";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";

function Hero() {
  return (
    <PadLayout>
      <div className="flex-1 flex flex-col gap-10 md:flex-row overflow-hidden">
        <div className="flex-1 px-2 flex justify-center lg:justify-end ">
          <div className="space-y-4 max-w-[700px] lg:max-w-[780px]">
            <img src={heroLogo} alt="Hero Logo" className="h-[100px] w-auto" />
            <h1 className="font-kenzoestic text-100 text-[2.5rem] leading-[3rem] md:text-[4rem] md:leading-[4.5rem] lg:text-[5rem] lg:leading-[5.5rem] xl:text-[6rem] xl:leading-[6.5rem]">
              connecting communities empowering local businesses
            </h1>
            <p className="font-medium text-slate-800 pt-2 text-base tracking-wide lg:text-[1.2rem] leading-relaxed">
              Discover, shop, and support Taytay's finest local products &mdash;
              all in one convenient digital marketplace
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center ">
          <div className="w-full flex flex-col gap-5 max-w-[500px] lg:max-w-[600px]">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                }),
              ]}
              opts={{
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {[sliderImage1, sliderImage2, sliderImage3].map(
                  (img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <img
                          src={img}
                          alt={`Slider image ${index + 1}`}
                          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                        />
                      </div>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>

            <Link
              to="/"
              className="ml-auto flex gap-3 font-medium text-100 px-3 md:px-0"
            >
              <span>See All Products</span>
              <MoveRight />
            </Link>
          </div>
        </div>
      </div>
    </PadLayout>
  );
}

export default Hero;
