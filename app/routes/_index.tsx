import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0 flex justify-center">
              <img
                className="h-full w-full object-cover"
                src="https://github.com/rogersaz/chYOUz/blob/main/public/chYOUz-Background-Song-Notes.jpg?raw=true"
                alt="chYOUz custom music for your custom slideshows"
              />
              <div className="absolute inset-0 bg-[color:rgba(139,92,246,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-12 pt-16 pb-8 sm:px-12 sm:pt-24 sm:pb-14 lg:px-16 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl font-montserrat">
                <span className="text-orange-500 drop-shadow-md">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ch<span className="text-7xl sm:text-9xl lg:text-10xl">YOU</span>z -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl font-montserrat">
                Personalized songs for your moments and memories.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8 font-montserrat"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <a
                      href="https://main--reliable-tapioca-f669c0.netlify.app/slideshow-order"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8 font-montserrat"
                    >
                      Order
                    </a>
                    <a
                      href="https://main--reliable-tapioca-f669c0.netlify.app/slideshow-order"
                      className="flex items-center justify-center rounded-md bg-violet-500 px-4 py-3 font-medium text-white hover:bg-violet-600 font-montserrat"
                    >
                      Contact
                    </a>
                  </div>
                )}
              </div>
              {/* Removed Remix logo */}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {/* Removed all logos */}
          </div>
        </div>
      </div>
    </main>
  );
}
