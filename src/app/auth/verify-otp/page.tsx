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
              src="/images/auth/OTP.svg"
              alt="forgot-password-image"
              className="w-full object-cover lg:w-11/12"
              width={25}
              height={25}
            />
          </div>

          <form className="mx-auto max-w-sm flex flex-col">
          <div className="mb-12 text-center">
              <h3 className="text-4xl font-extrabold text-blue-600">Veify OTP</h3>
            </div>
            <div className="mb-2 flex space-x-2 rtl:space-x-reverse justify-center">
              <div>
                <label className="sr-only">First code</label>
                <input
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-next="code-2"
                  id="code-1"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-11 w-11 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Second code</label>
                <input
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-1"
                  data-focus-input-next="code-3"
                  id="code-2"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-11 w-11 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Third code</label>
                <input
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-2"
                  data-focus-input-next="code-4"
                  id="code-3"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-11 w-11 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Fourth code</label>
                <input
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-3"
                  data-focus-input-next="code-5"
                  id="code-4"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-11 w-11 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Fifth code</label>
                <input
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-4"
                  data-focus-input-next="code-6"
                  id="code-5"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-11 w-11 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Sixth code</label>
                <input
                  type="text"
                  maxLength={1}
                  data-focus-input-init
                  data-focus-input-prev="code-5"
                  id="code-6"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-11 w-11 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center"
            >
              Please enter the 6 digit code we sent via email.
            </p>

            <div className="mt-12">
              <Link href='/auth/reset-password'>
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Verify
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default forgetPassword;
