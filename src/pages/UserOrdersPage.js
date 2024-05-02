import Navbar from "../features/navbar/Navbar";
import Userorders from "../features/user/components/Userorders";

function UserordersPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <h1 className="text-3xl font-bold tracking-normal text-gray-900 text-center ">
          My Orders
        </h1>
      </div>
      <Userorders />
    </>
  );
}

export default UserordersPage;
