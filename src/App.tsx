function App() {
  const greeting = import.meta.env.VITE_TEXT_GREETING;
  const mode = import.meta.env.MODE;

  return (
    <>
      <h1>Hello React</h1>
      <p>
        <strong>Current Mode:</strong> {mode}
      </p>
      <p>
        <strong>Greeting:</strong> {greeting}
      </p>
    </>
  );
}

export default App;