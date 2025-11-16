// Default SuperAdmin
const defaultUsers = [
  { empId: "E0001", username: "SuperAdmin", password: "1234", role: "SuperAdmin" },
];

// ✅ Load users or create default SuperAdmin
export const getUsers = () => {
  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // If no users, initialize default SuperAdmin
  if (storedUsers.length === 0) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  // Ensure SuperAdmin always exists
  const hasSuperAdmin = storedUsers.some(
    (u) => u.username === "SuperAdmin" && u.password === "1234"
  );
  if (!hasSuperAdmin) {
    storedUsers.push(defaultUsers[0]);
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }

  return storedUsers;
};

// ✅ Save users
export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// ✅ Add new user
export const addUser = (empId, username, password) => {
  const users = getUsers();

  if (users.some((u) => u.empId === empId)) {
    throw new Error("Employee ID already exists!");
  }
  if (users.some((u) => u.username === username)) {
    throw new Error("Username already exists!");
  }

  users.push({ empId, username, password, role: "User" });
  saveUsers(users);
};

// ✅ Delete user
export const deleteUser = (username) => {
  const users = getUsers().filter((u) => u.username !== username);
  saveUsers(users);
};

// ✅ Login
export const login = (username, password) => {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser && activeUser.username === username) {
      throw new Error("This user is already logged in on another system!");
    }

    localStorage.setItem("activeUser", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Invalid username or password!");
  }
};

// ✅ Get current user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("activeUser"));
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem("activeUser");
};
