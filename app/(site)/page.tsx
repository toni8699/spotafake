import Image from "next/image";
import Header from "@/Components/Header";
import ListItem from "@/Components/ListItem";
export default function Home() {
  return (
      <div className={'' +
          'bg-neutral-900 h-full w-full overflow-hidden'}>


          <Header>
              <div className={'mb-2'}>
                  <h1 className={'text-3xl font-bold text-white'}>
                            Welcome
                  </h1>
                  <div className={'grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1  gap-3 mt-4'}>
                        <ListItem imageUrl={'/images/liked.jpeg'} name={'Liked Songs'} href={'/liked'}/>
                  </div>
              </div>
          </Header>
          <div className={'px-6 mt-2'}  >
              <div>
                  <h1 className={'text-3xl font-bold text-white'}>
                      New Releases
                  </h1>
              </div>
              <div>
                  List of Songs
              </div>

          </div>
      </div>

  );
}
