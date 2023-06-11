import React from "react";

type Props = {

};

async function DashboardPage({}: Props) {
  const res = await fetch("http://localhost:4000/getUsers")
    .then((res) => res.json())
    .then((data) => {
      return data
    });
  const data = res.users;
  const usersData = data.map((user: any) => {
    return <h1 key={user._id}>{user.name}</h1>;
  });
  return <div>{usersData}</div>;
}

export default DashboardPage;
