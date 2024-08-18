import Image from "next/image";
import Link from "next/link";

const forgetPassword = () => {
  return (
    <div className="flex items-center justify-center bg-white p-4 font-[sans-serif] md:h-screen">
      <div className="max-w-6xl rounded-md p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-md:max-w-lg">
        <a href="javascript:void(0)">
          {/* <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-40 md:mb-4 mb-12"
          /> */}
        </a>

        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="max-md:order-1 lg:min-w-[450px]">
            <Image
              src="/images/auth/forgot password.svg"
              alt="forgot-password-image"
              className="w-full object-cover lg:w-11/12"
              width={25}
              height={25}
            />
            {/* <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:w-11/12 w-full object-cover"
              alt="login-image"
            /> */}
          </div>

          <form className="mx-auto w-full md:max-w-md">
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">
                Forgot Password
              </h3>
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-blue-600"
                  placeholder="Enter email"
                  
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="absolute right-2 h-[18px] w-[18px]"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            {/* <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center"></div>
              <div>
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Sign In?
                </Link>
              </div>
            </div> */}

            <div className="mt-12">
              <Link href="/auth/verify-otp">
                <button
                  type="button"
                  className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none"
                >
                  Forgot Password
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default forgetPassword


    