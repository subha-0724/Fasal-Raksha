import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-appbg flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page not found</h2>
        <p className="text-muted mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Button leftIcon={<Home className="h-4 w-4" />} onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}