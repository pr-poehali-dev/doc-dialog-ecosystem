import MasseursBenefits from "./MasseursBenefits";
import MasseursEducation from "./MasseursEducation";
import MasseursClients from "./MasseursClients";
import MasseursTools from "./MasseursTools";
import MasseursCommunity from "./MasseursCommunity";
import MasseursSuccess from "./MasseursSuccess";
import MasseursCTA from "./MasseursCTA";

export default function MasseursContent() {
  return (
    <>
      <MasseursBenefits />
      <MasseursEducation />
      <MasseursClients />
      <MasseursTools />
      <MasseursCommunity />
      <MasseursSuccess />
      <MasseursCTA />
    </>
  );
}
