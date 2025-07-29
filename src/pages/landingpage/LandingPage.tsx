import PageLayout from "@/layouts/PageLayout";
import Hero from "./Hero";
import Features from "./Features";
import Categories from "./Categories";
import MostViewed from "./MostViewed";
import NewArrivals from "./NewArrivals";
import Separator from "@/components/Separator";

function LandingPage() {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <Categories />
      <Separator />
      <MostViewed />
      <Separator />
      <NewArrivals />
    </PageLayout>
  );
}

export default LandingPage;
