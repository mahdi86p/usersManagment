import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import "./index.css";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!localStorage.users) {
      getUsers();
    } else {
      getUsersFromLocalStorage();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setUsers(json);
      localStorage.setItem("users", JSON.stringify(json));
    } catch (error) {
      toast.error("We can not read server");
    } finally {
      setLoading(false);
    }
  };

  function getUsersFromLocalStorage() {
    const storedUsers = JSON.parse(localStorage.getItem("users") || []);
    if (storedUsers.length !== 0) {
      setUsers(storedUsers);
    } else {
      getUsers();
    }
    setLoading(false);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleEnterClick(event) {
    event.key === "Enter" ? addUsers() : "";
  }

  function addUsers() {
    if (!inputValue.trim()) {
      const notify = toast.error('Enter a name and try again')
      notify()
      return;
    }

    const newUser = {
      id: uuidv4(),
      name: inputValue,
      email: `${inputValue.toLowerCase()}@example.com`,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setInputValue("");
  }

  function removeBoxFunc(userId, userName) {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast(userName + " User removed");
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="w-full flex items-center gap-2 mb-6 max-md:flex-col">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all max-md:w-[100%]"
          placeholder="Enter name"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterClick}
          required
        />
        <button
          onClick={addUsers}
          className="text-white px-4 py-2 bg-green-400 border border-gray-100 rounded-lg duration-250 hover:border-gray-300 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition cursor-pointer border-none max-md:w-[100%]"
        >
          Add User
        </button>
      </div>

      <div className="mb-6 text-gray-700 dark:text-gray-300">
        All information from:{" "}
        <a
          href="https://jsonplaceholder.typicode.com/users"
          className="text-blue-600 hover:underline dark:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://jsonplaceholder.typicode.com/users
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:bg-gray-700 max-md:flex-col max-md:gap-7 max-md:text-center"
            >
              <div className="max-md:flex max-md:justify-between max-md:flex-col flex-row gap-2 w-100">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              </div>
              <button
                onClick={(e) => removeBoxFunc(user.id, user.name)}
                className="p-3 bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-white cursor-pointer max-md:w-[100%]"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
