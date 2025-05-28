import Image from "next/image";

const ScreenMockup = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="relative w-full max-h-[80vh] aspect-[16/9]">
          {/* Background Gradient */}
          <div className="absolute -inset-[10px] dark:-inset-[100px] bg-gradient-to-br from-purple-900/80 via-blue-800/50 to-transparent rounded-sm dark:rounded-[10rem] blur-[7rem] dark:blur-[5rem]" />

          {/* Image */}
          <Image
            src="/screen-mockup.png"
            alt="Interface do editor de texto UpWrite"
            fill
            className="object-contain relative z-10"
            priority
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

export default ScreenMockup;
