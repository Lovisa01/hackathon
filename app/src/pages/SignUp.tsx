import { BASE_URL } from "../../Constants";
import Input from "../components/Input";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { set } from "date-fns";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function SignUp() {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleNameChange = (value: string) => {
    setNameInput(value);
  };

  const handlePasswordChange = (value: string) => {
    setPasswordInput(value);
  };

  const signup = async () => {
    if (nameInput === "") {
      setErrorMessage("Username cannot be empty");
      onOpen();
      return;
    }
    if (passwordInput === "") {
      setErrorMessage("Password cannot be empty");
      onOpen();
      return;
    }
    const response = await fetch(BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        password: passwordInput,
      }),
    });
    if (response.ok) {
      //   console.log(response.json());
      setNameInput("");
      setPasswordInput("");
      onOpen();

      //   return response.json();
    } else if (response.status === 409) {
      setErrorMessage("Username already exists");
      onOpen();
    } else {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    // console.log(data);
  };

  //   function onSubmit() {
  //     fetch(BASE_URL + "/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: nameInput,
  //         password: passwordInput,
  //       }),
  //     }).then((response) => {
  //       if (response.ok) {
  //         console.log(response.json());
  //         return response.json();
  //       } else {
  //         throw new Error("Something went wrong");
  //       }
  //     });
  //   }

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new user</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
          {/* <form className="space-y-6" action={BASE_URL + "/signup"} method="POST"> */}
          <div>
            <div className="mt-2">
              <Input value={nameInput} inputChange={handleNameChange} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between"></div>
            <div className="mt-2">
              <Input value={passwordInput} label="Password" inputChange={handlePasswordChange} type="password" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-10 flex w-full justify-center rounded-md bg-[#3d478a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={signup}
            >
              Sign up
            </button>
          </div>
          <div className="text-sm justify-end">
            <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
          {/* </form> */}

          <p className="mt-10 text-center text-sm text-gray-500">
            Already created a user?{" "}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              View your stats!
            </a>
          </p>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                {errorMessage !== "" ? (
                  <p className="text-red-500">{errorMessage}</p>
                ) : (
                  <div>
                    <h1>Success!</h1>
                    <p>You created a new user!</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    window.location.href = "/";
                  }}
                >
                  Home
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
