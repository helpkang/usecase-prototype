import { renderHook, act, waitFor } from "@testing-library/react";
import { useProductUseCase } from "../useProductUseCase";

describe("useProductUseCase", () => {
  it("should create a product", async () => {
    const { result } = renderHook(useProductUseCase);

    act(() => {
      result.current.addProduct({ id: "1", name: "Test Product", price: 100 });
    });
    waitFor(() => {
      expect(result.current.products).toContainEqual({
        id: "1",
        name: "Test Product",
        price: 100,
      });
    });
  });

//   it("should delete a product", async () => {
//     const { result, waitForNextUpdate } = renderHook(useProductUseCase);

//     act(() => {
//       result.current.deleteProduct("1");
//     });

//     await waitForNextUpdate();

//     expect(result.current.products).not.toContainEqual({
//       id: "1",
//       name: "Test Product",
//       price: 100,
//     });
//   });
});
