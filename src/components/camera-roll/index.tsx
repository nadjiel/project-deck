import profile from "@/assets/profile.jpg";

export default function CameraRoll() {
  return (
    <img src={profile.src} className="size-64 object-cover rounded-full" />
  );
}
