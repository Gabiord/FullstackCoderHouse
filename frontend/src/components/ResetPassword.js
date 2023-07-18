import axios from "axios";
import { useEffect, useState } from "react";
import { Report } from "notiflix";
import { useParams } from "react-router-dom";

function ResetPassword() {

  const { token } = useParams()
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  console.log(token)

  const handleChangePassword1 = (evt) => {
    setPass1(evt.target.value);
  };
  const handleChangePassword2 = (evt) => {
    setPass2(evt.target.value);
  };

  const handleClickChangePassword = (evt) => {
    evt.preventDefault();
    if (pass1 === pass2){
      const newpass = {pass1};
  
      axios({
        method: "post",
        url: `http://localhost:8080/api/sessions/resetpassword/${token}`,
        data: newpass,
      })
        .then((result) => {
          Report.success("Contraseña cambiada satisfactoriamente", "");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Report.failure("No se pudo cambiar la contraseña", "");
            console.error(error);
          }
        });
    }

  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
            Cambia la contraseña:
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleClickChangePassword}>
          <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nueva contraseña:
                </label>
              </div>
              <div className="mt-2">
                <input
                  onBlur={handleChangePassword1}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Repite la contraseña:
                </label>
              </div>
              <div className="mt-2">
                <input
                  onBlur={handleChangePassword2}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cambiar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
