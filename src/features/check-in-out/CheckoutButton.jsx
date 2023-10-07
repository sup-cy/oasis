import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckout } = useCheckOut();
  const navigate = useNavigate();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => {
        checkout(bookingId);
        navigate("/");
      }}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
