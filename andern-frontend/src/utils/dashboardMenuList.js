import { IoHome } from "react-icons/io5";
import { LuStethoscope } from "react-icons/lu";
import { FaPills } from "react-icons/fa6";

export const dashboardMenuList = [
  {
    name: "Get prescription",
    // icon: <LuStethoscope />,
    path: "dashboard/submitdiagnosis",
  },
  {
    name: "Get Diagnosis",
    // icon: <FaPerson />,
    path: "dashboard/symptoms",
  },
  {
    name: "Get a drug",
    // icon: <FaPills />,
    path: "dashboard/drugs",
  },
  {
    name: "Emergency",
    // icon: <FaPills />,
    path: "dashboard/drugs",
  },
];
