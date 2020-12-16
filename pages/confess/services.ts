import router from "next/router";
import { FormEvent } from "react";

export const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
  data: string
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: data }),
  };

  event.preventDefault();

  try {
    const data = await fetch(`api/confess`, requestOptions);

    if (data.status === 201) {
      router.push("/confessions");
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(JSON.stringify({ message: data }));
    console.log(error);
  }
};
