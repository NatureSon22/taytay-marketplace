import { useBreadCrumbStore } from "@/states/breadCrumbStore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

function BreadCrumbNav() {
  const crumbs = useBreadCrumbStore((state) => state.crumbs);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>{crumb.label}</BreadcrumbItem>

            {i < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbNav;
