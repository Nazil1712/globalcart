import Navbar from "../features/navbar/Navbar";
import Userorders from "../features/user/components/Userorders";

function UserordersPage() {
  return (
    <>
      <Navbar>
        <Userorders />
      </Navbar>
    </>
  );
}

export default UserordersPage;
