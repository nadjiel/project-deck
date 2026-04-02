import Logo from "@/components/logo";
// import OptionDrawer from "@/components/option-drawer";
import OptionPanel from "@/components/option-panel";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-2">
      <Logo />
      {/* <OptionDrawer className="sm:hidden" /> */}
      <OptionPanel /* className="not-sm:hidden" */ />
    </header>
  );
}
