import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import QueryOptions from "./QueruesOption";
import { toast } from "react-toastify";
import ShowQueries from "./ShowQueries";

const Queries = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [menu, setMenu] = useState({});
  const [resp, setResp] = useState(false);
  const [count,setCount] = useState({});

  const FetchQueries = async (option) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`https://deployment-1-99ih.onrender.com/selected/${option}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
      },
      credentials: "include",
      // body: JSON.stringify(),
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      toast.error(result.message, {
        position: "top-center",
      });
      return;
    }
    if (response.ok) {
      setMenu(result.data);
      setResp(true);
      setCount(result.count);
      return;
    }
    setSelectedOption(option)
  };
  useEffect(() => {
    FetchQueries();
  }, []);
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <QueryOptions
      count = {count}
        FetchQueries={FetchQueries}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      ></QueryOptions>
      {resp ? (
        <div className="">
          {menu.map((menu) => (
            <ShowQueries reload={FetchQueries} selectedOption={selectedOption} key={menu._id} user={menu} />
          ))}
        </div>
      ) : (
        <div>Error in Response from server</div>
      )}
    </div>
  );
};
export default Queries;
