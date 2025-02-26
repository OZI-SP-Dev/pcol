import { useEffect } from "react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true }); // Redirect to home page
  }, [navigate]);

  return (
    <>
      <h1>Page Not Found</h1>
      <p>Redirecting to the home page...</p>
    </>
  );
}

export default NotFound;
