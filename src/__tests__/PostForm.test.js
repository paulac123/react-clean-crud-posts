import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from "../components/PostForm";
import { PostContext } from "../context/PostContext";

test("verifica que el formulario envía correctamente", async () => {
  const createPostMock = jest.fn();
  const updatePostMock = jest.fn();
  const setEditPostMock = jest.fn();

  render(
    <PostContext.Provider
      value={{
        createPost: createPostMock,
        updatePost: updatePostMock,
        editPost: null,
        setEditPost: setEditPostMock,
      }}
    >
      <PostForm />
    </PostContext.Provider>
  );

  // Usamos userEvent para llenar los campos
  const titleInput = screen.getByRole("textbox", { name: /Título/i });
  const descInput = screen.getByRole("textbox", { name: /Descripción/i });

  await userEvent.type(titleInput, "Cambio de Post");
  await userEvent.type(descInput, "Descripción del cambio");

  // Hacemos submit
  const submitBtn = screen.getByRole("button", { name: /Crear Post/i });
  await userEvent.click(submitBtn);

  // Verificamos
  expect(createPostMock).toHaveBeenCalledWith({
    title: "Cambio de Post",
    description: "Descripción del cambio",
  });
});
