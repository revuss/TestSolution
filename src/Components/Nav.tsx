import { useDarkMode } from "../utils/themeUtils";

const Nav: React.FC = () => {
  const { dark, handleThemeToggle } = useDarkMode();

  return (
    <nav className="p-4 flex justify-end bg-transparent dark:bg-black">
      <button
        onClick={handleThemeToggle}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {dark ? "Light" : "Dark"}
      </button>
    </nav>
  );
};

export default Nav;
