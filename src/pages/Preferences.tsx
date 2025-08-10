import { useNavigate } from "react-router-dom";
import { PreferencesOnboarding } from "@/components/preferences/PreferencesOnboarding";

export default function Preferences() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-6">
      <PreferencesOnboarding onComplete={() => navigate("/")} />
    </div>
  );
}
