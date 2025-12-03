function App() {
  const greeting = import.meta.env.VITE_TEXT_GREETING;

  return (
    <>
      <h1>Hello React</h1>
      <p>{greeting}</p>
    </>
  );
}

export default App;