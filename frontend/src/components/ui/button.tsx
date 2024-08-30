import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        auth: "rounded-md bg-white text-primary hover:bg-primary-hover hover:text-white dark:bg-gray-700 dark:hover:bg-gray-900",
        primary: "rounded-md bg-primary text-white hover:bg-primary-hover",
        secondary:
          "rounded-md border border-primary bg-primary/10 px-6 py-1 text-sm font-normal text-primary dark:bg-black dark:hover:bg-primary/20 hover:bg-primary/10",
        outline:
          "rounded-full border-2 bg-white dark:bg-black dark:hover:bg-primary/20 hover:bg-primary/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-white hover:text-primary-hover bg-primary-hover rounded-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8  px-3",
        lg: "h-12  px-8",
        xl: "h-14  px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "cursor-wait"
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && (
          <div className="align-center flex justify-center">
            <LoaderCircle className="mr-2 animate-spin" size={"1.25em"} />
            {props.children}
          </div>
        )}
        {!loading && props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
