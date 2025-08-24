import type { SVGProps } from "react"

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-3.91 19.4a1.3 1.3 0 0 0 1.82-1.16a7.4 7.4 0 0 1 0-14.48A10 10 0 0 0 12 2Z"/>
    </svg>
  ),
}
