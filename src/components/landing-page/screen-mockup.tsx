import Image from "next/image";

const ScreenMockup = () => {
  return (
    <section className="min-h-[50vh] lg:h-screen w-full flex items-center justify-center py-8 md:py-16">
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="relative w-full h-full">
          {/* Background Gradient */}
          <div className="absolute  -inset-[10px] dark:-inset-[100px] bg-gradient-to-br from-purple-900/80 via-blue-800/50 to-transparent rounded-sm dark:rounded-[10rem] blur-[7rem] dark:blur-[5rem]" />

          {/* Image Container */}
          <div className="relative w-full aspect-[16/9] flex items-center justify-center">
            <Image
              src="/screen-mockup.png"
              alt="Interface do editor de texto UpWrite"
              fill
              className="object-contain"
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenMockup;
