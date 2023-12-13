import Logo from "./stackline-logo.svg?react";

const AppTopBar = () => {
  return (
    <header className="bg-blue-950 sticky top-0 z-50 p-4">
      <Logo className="h-8 w-8" />
    </header>
  );
};

export default AppTopBar;
