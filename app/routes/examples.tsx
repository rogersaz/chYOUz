import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-green sm:flex sm:items-center sm:justify-center">
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
              <h1 className="text-center text-6xl font-extrabold sm:text-8xl lg:text-9xl font-montserrat tracking-normal sm:tracking-tighter">
                <span className="text-orange-500 drop-shadow-md">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Example<span className="text-7xl sm:text-9xl lg:text-10xl"></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </h1>
              <div className="mt-10 flex flex-col items-center">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide>
                    <div className="relative w-full max-w-xl aspect-video">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/An_CFJ7x-JE"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative w-full max-w-xl aspect-video">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/J3X3gSRlpbY"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </SwiperSlide>
                  {/* Add more SwiperSlide components as needed */}
                </Swiper>
              </div>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center sm:space-x-4">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8 font-montserrat"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:space-y-0 sm:inline-grid sm:grid-cols-5 sm:gap-5">
                    <Link
                      to="/slideshow-order"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8 font-montserrat"
                    >
                      Order
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600 font-montserrat"
                    >
                      ABOUT
                    </Link>
                    <Link
                      to="/#"
                      className="flex items-center justify-center rounded-md bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600 font-montserrat"
                    >
                      EXAMPLES
                    </Link>
                    <Link
                      to="/pricing"
                      className="flex items-center justify-center rounded-md bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600 font-montserrat"
                    >
                      PRICING
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600 font-montserrat"
                    >
                      Contact
                    </Link>
                  </div>
                )}
              </div>
              {/* Removed Remix logo */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
