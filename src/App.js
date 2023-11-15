import './style.css';

function App() {
  return (
    <>
    {/* HEADER */}
    <header className="header">
    <div className="logo">
      <img
        src="logo.png"
        height="68"
        width="68"
        alt="Today I Learned Logo"
      />
      <h1>Today I Learned</h1>
    </div>
    

    <button className="btn btn- btn-open">Share a fact</button>

  </header>
    
    <NewfactForm />

      <main class = "main">
      <FactList />
      <CategoryFilter />
  </main>
  </>
  );
}

function NewfactForm(){
  return <form>Fact form</form>;
}

function CategoryFilter() {
  return <aside>Category filter</aside>;
}

function FactList() {
  return <section>Section list</section>;
}
export default App;