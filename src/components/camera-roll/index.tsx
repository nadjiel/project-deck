import profile from "@/assets/profile.jpg";

export default function CameraRoll() {
  return (
    <div className="relative size-64">
      <img src={profile.src} className="size-full object-cover rounded-full" />
      <div className="absolute top-0 size-full animate-spin animation-duration-20000">
        <div className="absolute top-3/20 left-2/6 -translate-1/2 size-8 rounded-full bg-background"></div>
        <div className="absolute top-1/8 left-1/2 -translate-1/2 size-10 rounded-full bg-background"></div>
        <div className="absolute top-3/20 left-4/6 -translate-1/2 size-8 rounded-full bg-background"></div>
      </div>
    </div>
  );
}
