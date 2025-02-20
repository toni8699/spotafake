
import Header from "@/Components/Header";
import ListItem from "@/Components/ListItem";
import getSongs from "@/actions/getSongs";

import PageContent from "@/Components/PageContent";
export const revalidate = 0;



export default async function Home() {
    const songs = await getSongs();

  return (
      <div className={'' +
          'bg-neutral-900 h-full w-full overflow-hidden'}>
          <Header>
              <div className={'mb-2'}>
                  <h1 className={'text-3xl font-bold text-white'}>
                            Welcome back
                  </h1>
                  <div className={'grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1  gap-3 mt-4'}>
                        <ListItem imageUrl={'/images/liked.jpeg'} name={'Liked Songs'} href={'/liked'}/>
                  </div>
              </div>
          </Header>
          <div className={'px-6 mt-2 pb-[200px] h-full overflow-y-auto'}  >
              <div>
                  <h1 className={'text-3xl font-bold text-white'}>
                      New Releases
                  </h1>
              </div>
              <div className={`m-4 scroll-pb-72 h-full`}>
                  <PageContent songs={songs}/>
              </div>
          </div>

      </div>

  );
}
