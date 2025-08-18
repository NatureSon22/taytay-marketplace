export const register = async (form: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    body: form,
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = await res.json();
    return new Error(message);
  }

  const { message } = await res.json();
  return message;
};

export const getLoggedInUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = await res.json();
    return new Error(message);
  }

  const { data } = await res.json();
  return data;
};
