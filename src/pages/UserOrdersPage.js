import Navbar from "../features/Navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <h1 className="text-3xl font-bold tracking-normal text-gray-900 text-center ">
          My Orders
        </h1>
      </div>
      <UserOrders />
    </>
  );
}

export default UserOrdersPage;
