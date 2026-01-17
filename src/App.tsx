function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full height with title */}
      <section className="h-screen flex items-center justify-center bg-stone-900 text-white">
        <div className="text-center px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Biography</h1>
        </div>
      </section>

      {/* Short text */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-8">Chapter One</h2>
          <p className="text-lg leading-relaxed text-stone-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
            autem maxime, debitis et, explicabo voluptatibus sapiente nihil
            ducimus incidunt dolore at illum pariatur ad corrupti possimus fuga.
            Assumenda, veniam ipsa.
          </p>
        </div>
      </section>

      {/* Image section */}
      <section className="h-screen relative">
        <img
          src="https://picsum.photos/1920/1080?random=1"
          alt="Image 1"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Long text */}
      <section className="px-8 py-20 bg-stone-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Chapter Two</h2>
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet.
            </p>
            <p>
              Consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident.
            </p>
          </div>
        </div>
      </section>

      {/* End Section */}
      <section className="h-screen flex items-center justify-center bg-stone-900 text-white">
        <div className="text-center px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The End</h2>
          <p className="text-xl text-stone-400">Thank you for reading</p>
        </div>
      </section>
    </div>
  );
}

export default App;
