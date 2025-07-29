import Separator from "@/components/Separator";
import about from "@/data/about";
import PageLayout from "@/layouts/PageLayout";
import Section from "./Section";
import Location from "./Location";
import { Fragment } from "react/jsx-runtime";

function AboutPage() {
  return (
    <PageLayout>
      {about.map((el, i) => {
        return (
          <Fragment key={i}>
            <Section {...el} />
            <Separator />
          </Fragment>
        );
      })}
      <Location />
    </PageLayout>
  );
}

export default AboutPage;
