import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center"> Your Experiences</span>
    </h1>
    <p className="desc text-center">
      Fuel Your Creativity, Inspire the World: Unleash Your Ideas with Our
      Blogging Platform!
    </p>

    <Feed />
  </section>
);

export default Home;
