import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Homepage</p>
        </Layout>} />

        <Route path="/search" element={<Layout>
          <p>SearchPage</p>
        </Layout>} />

        <Route path="/register" element={<Layout>
          {<Register/>}
        </Layout>} />
        <Route path="*" element />
      </Routes>
    </Router>
  )
}

export default App
