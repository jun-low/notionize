import Image from "next/image";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/person-typing.svg"
            fill
            className="object-contain dark:hidden"
            alt="A person typing on a typing machine"
          />
          <Image
            src="/person-typing-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="A person typing on a typing machine"
          />
        </div>
        <div className="relative h-[250px] w-[400px] hidden md:block">
          <Image
              src="/person-files.svg"
              fill
              className="object-contain dark:hidden"
              alt="A person going through files"
            />
            <Image
              src="/person-files-dark.svg"
              fill
              className="object-contain hidden dark:block"
              alt="A person going through files"
            />
        </div>
      </div>
    </div>
  )
}