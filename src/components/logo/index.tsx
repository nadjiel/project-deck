import Link from "next/link";

export default function Logo() {
  return (
    <h1 className="text-[32px] font-extrabold uppercase tracking-[2px] cursor-default select-none">
      <Link href="/">
        Nayel
      </Link>
    </h1>
  );
}
