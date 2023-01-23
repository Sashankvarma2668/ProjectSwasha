import Head from "next/head";
import Header from "./template/header";
import Footer from "./template/footer";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Whitney Francis",
    role: "Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Whitney Francis",
    role: "Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Whitney Francis",
    role: "Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },

  // More people...
];

export default function Example() {
  return (
    <div>
      <Head>
        <title>About Us - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <section class="xl:p-10  bg-gray-100 mb-10">
        <div>
          <div class="heading flex items-center justify-center text-3xl font-serif font-bold">
            Our History
          </div>
          <div class="pt-10 font-serif p-3 md:px-10 xl:px-40 text-justify">
            Where people hesitate to tread their steps towards service, a group
            of students from BITS Pilani initiated the voluntary efforts to
            serve the needy people from the lower strata. They started teaching
            to the children of mess workers and construction labor and used to
            visit local villagers. One day, Kashiram Ka, their regular student,
            who worked as a Rikshawala, didn’t appear in the gathering.
            Wondered, the students visited his home and ended up with an
            epiphany on the conditions of life in the village of Pilani. The
            Riskshawala had met with an accident and was bed ridden. His girl
            child had to drop out to help her mother in day to day work, they
            couldn't afford medical care nor proper food - they were eating roti
            that is cooked days ago
          </div>
          <div class="pt-10 font-serif p-3 md:px-10 xl:px-40 text-justify">
            This encounter left a lasting impact on the students and motivated
            them to explore deeper on one’s responsibility for a better tomorrow
            for others and the nation. Back to the Campus, the group announced a
            meet-up for those who wanted to contribute to the Nation. The group
            was pleasantly surprised to see 150+ students dropping in, realizing
            the very fact that 'we are NOT ALONE'.
          </div>
          <div class="pt-10 font-serif p-3 md:px-10 xl:px-40 text-justify">
            The ignited hearts didn’t give up after the passing out of their
            studies. Placed across the country in various MNCs, the graduates
            continued the Spirit by identifying various initiatives in and
            around their respective locations, formed Chapters, inspired their
            colleagues, raised funds and started volunteering during weekends.
          </div>
          <div class="pt-10 font-serif p-3 md:px-10 xl:px-40 text-justify">
            Thus, ‘My India’, a humble passion driven initiative by a group of
            10 students evolved into ‘Nirmaan’ in 2007 as a Registered Society
            with the motto ‘We Have Only One passion, The Rise of a Great
            Nation’. Since then, it has grown multifold and has reached out to
            5+ lakh people in 8 states of India, with the financial and moral
            support of people from various walks of life viz., Philanthropists,
            Technocrats, Artists, Entrepreneurs, Social Activists, Social
            Science Experts and last but not least funding partners.
          </div>
        </div>
      </section>
      {/*<div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Team</h2>
              <p className="text-xl text-gray-500">
                Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet lectus sit pretium egestas vel mattis
                neque.
              </p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
              {people.map((person) => (
                <li key={person.name}>
                  <div className="space-y-6">
                    <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={person.imageUrl} alt="" />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.name}</h3>
                        <p className="text-indigo-600">{person.role}</p>
                      </div>
                      <ul className="flex justify-center space-x-5">
                        <li>
                          <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>*/}

      <Footer />
    </div>
  );
}
