function Button({
  children,
  theme = "primary",
  className,
  ...props
}: {
  children: React.ReactNode;
  theme?: "primary" | "secondary" | "danger" | "success";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const themeStyles = {
    primary: "bg-primary hover:bg-primary-glow shadow-primary",
    secondary: "bg-secondary hover:bg-secondary-glow shadow-secondary",
    danger: "bg-danger hover:bg-danger-glow shadow-danger",
    success: "bg-success hover:bg-success-glow shadow-success"
  };

  return (
    <button
      {...props}
      className={`${className || ""} ${themeStyles[theme]} text-text hover:scale-105 
      duration-300 shadow-md p-2 rounded-xl cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default Button;
