async function getUsers() {
  const res = await fetch('http://localhost:3001/users', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  console.log("users:::", users);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <img
              src={user.image}
              alt={user.name}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
