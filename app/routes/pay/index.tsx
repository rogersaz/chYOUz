import { Link } from "@remix-run/react";
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Stripe 4 chYOUz</h1>

      <Link to="/pay">Welcome To My Pay Now</Link>
    </div>
  );
}