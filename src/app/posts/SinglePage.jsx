// SinglePageClientComponent.js
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

function SinglePageClientComponent({ slug, initialIsFeatured }) {
  const [isFeatured, setIsFeatured] = useState(initialIsFeatured);
  const [session] = useSession();

  useEffect(() => {
    // Implement your feature/unfeature logic here when the button is clicked
    // Make API requests to toggle the feature status
  }, [isFeatured]);

  return (
    <div>
      <p>Featured: {isFeatured ? "Yes" : "No"}</p>
      {session && session.user.email === "jhaabhishek910@gmail.com" && (
        <button onClick={() => setIsFeatured(!isFeatured)}>
          {isFeatured ? "Unfeature" : "Feature"}
        </button>
      )}
    </div>
  );
}

export default SinglePageClientComponent;
