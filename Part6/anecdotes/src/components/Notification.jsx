import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  };

  if (notification.notification === "") return null;

  return <div style={style}>{notification.notification}</div>;
}

export default Notification;
