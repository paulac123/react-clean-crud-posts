import { PostProvider } from "./context/PostContext";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";

const App = () => {
  return (
    <PostProvider>
      <div className="App">
        <h1>Blog</h1>
        <PostForm />
        <PostList />
      </div>
    </PostProvider>
  );
};

export default App;
