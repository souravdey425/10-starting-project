import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const usefetchData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://create-app2-a67fd-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Not Abble To Get Data");
      }
      const data = response.json();
      return data;
    };
    try {
      const cartConst = await fetchData();
      dispatch(cartActions.replaceCart(cartConst));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "NotFetching Cart Data ",
        })
      );
    }
  };
};

export const sentCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending....",
        message: "Sending Cart Data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://create-app2-a67fd-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "Success",
          title: "successfull",
          message: "Sending Cart Data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Not Sending Cart Data ",
        })
      );
    }
  };
};
