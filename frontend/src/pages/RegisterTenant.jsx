import React , {useState} from 'react'
import Logo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterTenant() {
    const navigate = useNavigate();
    const [values ,setValues] = useState({
      name:'',
      email:'',
      password:'',
      idproofnumber:'',
      phonenumber:''
    })

    const handleChange = (event) =>{
       setValues({...values , [event.target.name] : [event.target.value]})
    }
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:4000/registertenant',values)
      .then(res => {
        console.log("Registered Successfully");
        setIsRegistered(true);
      })
      .catch(err => console.error(err));
    }
    if (isRegistered) {
      navigate('/logintenant');
    }
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
                <img
                  className="mx-auto h-10 w-auto"
                  src={Logo}
                  alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Register your account
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST"  onSubmit={handleSubmit}>

                  <div>
                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
      
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                       />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="idproofnumber" className="block text-sm font-medium leading-6 text-gray-900">
                        Id Proof Number
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="idproofnumber"
                        name="idproofnumber"
                        type="number"
                        autoComplete="idproofnumber"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                       />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="phonenumber"
                        name="phonenumber"
                        type="number"
                        autoComplete="phonenumber"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
      
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Register
                    </button>
                  </div>
                </form>
      
                
              </div>
            </div>
          </>
        )
      }