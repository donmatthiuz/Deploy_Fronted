import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";

import Button from "../ui/button/Button";
import useApi from "../../hooks/useApi";
import source_link from "../../repositori/source_repo";
import { object, string } from 'yup';
import useForm from "../../hooks/useForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { md5 } from "js-md5";
import useToken from "../../hooks/useToken";

const schema = object({
  password: string().required('Contraseña requerida'),
  usuario: string().required('Usuario requerido'),
});



export default function SignInForm() {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { llamado: login } = useApi(`${source_link}/login`);


  const { values, setValue } = useForm(schema, { 
    password: '',
    usuario: '',
  });
  const handleChange_useForm = (e:any) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const login_to = async (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    const body = {
      usuario: values.usuario,
      password: md5(values.password)
      };
    
   
    const response = await login(body, 'POST');
    console.log(response)  

    if (response.success === true){
      setToken(response.acces_token);
      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "Inicio de Sesion exitosa",
        text: response.message,
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Error inicio de Sesion",
        text: response.message,
      });
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Iniciar Sesion
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Agrega tu usuario y contraseña para ingresar
            </p>
          </div>
          <div>
          
           
            <form>
              <div className="space-y-6">
                <div>
                  <Label
                     >
                    Usuario<span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="usuario" 
                    name="usuario"
                    value={values.usuario}
                    onChange={handleChange_useForm}/>
                </div>
                <div>
                  <Label>
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                       name="password"
                       onChange={handleChange_useForm}
                       value={values.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div> */}
                  {/* <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <div>
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={(e: FormEvent<HTMLFormElement>) => login_to(e as React.FormEvent<HTMLFormElement>)}>
                    Iniciar Sesion
                  </Button>
                </div>
              </div>
            </form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
