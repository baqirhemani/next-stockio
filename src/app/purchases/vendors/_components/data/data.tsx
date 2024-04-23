import { CircleArrowDown, CircleArrowRight, CircleArrowUp, CircleCheck, CircleHelp, CircleX, Timer } from "lucide-react"
  
  export const statuses = [
    {
      value: "inactive",
      label: "In active",
      icon: CircleHelp,
    },
    {
      value: "draft",
      label: "Draft",
      icon: Timer,
    },
    {
      value: "active",
      label: "Active",
      icon: CircleCheck,
    },
    {
      value: "archived",
      label: "Archived",
      icon: CircleX,
    },
  ]
  
 