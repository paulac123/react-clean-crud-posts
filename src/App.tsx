import { PostProvider } from "./context/PostContext";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { Container, Typography } from "@mui/material";

const App = () => {
  return (
    <PostProvider>
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Blog Posts
        </Typography>
        <PostForm />
        <PostList />
      </Container>
    </PostProvider>
  );
};

export default App;
