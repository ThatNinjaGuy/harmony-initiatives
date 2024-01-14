"use client";

import { FC } from "react";

import CountUpNumber from "../CountUpNumber/CountUpNumber";

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 h-full">
        {/* Room heading is rendered as server component in order to ensure that this text is used for SEO
        and other functionalities. Also rendering this and images on server side ensures that the loading time is fast.*/}
        {heading1}
        {/* Room Count with animation */}
        <div className="flex justify-between mt-12">
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Total Funds Raised</p>
            <CountUpNumber duration={2000} endValue={2198000} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Partners in Change</p>
            <CountUpNumber duration={2000} endValue={3200} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Projects Completed</p>
            <CountUpNumber duration={2000} endValue={923} />
          </div>
        </div>
      </div>
      {/* Room images */}
      {section2}
    </section>
  );
};

export default ClientComponent;
