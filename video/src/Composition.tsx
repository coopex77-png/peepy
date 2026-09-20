import { Composition } from "remotion";
import { Launch, LaunchProps } from "./Launch";

// 9 s, 1920x1080, 30 fps. Twitter-friendly 16:9.
export const MyComposition = () => {
  return (
    <Composition
      id="PeepeeLaunch"
      component={Launch}
      durationInFrames={270}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={
        {
          // Where the counter lands. Length follows the site's formula: 19 cm at $10K, 60 cm at $100K, 1.9 m at $1M.
          marketCap: 1_000_000,
          ticker: "PEEPEE",
          url: "peepee.online",
        } satisfies LaunchProps
      }
    />
  );
};
