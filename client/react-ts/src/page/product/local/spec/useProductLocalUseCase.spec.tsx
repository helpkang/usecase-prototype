import {
  renderHook,
  act,
  waitFor,
  RenderHookResult,
} from "@testing-library/react";

import { useProductLocalUseCase } from "../useProductLocalUseCase";
import { createWrapper } from "../../../../share/test/createWrapper";
describe("useProductUseCase", () => {
  let hook: RenderHookResult<
    ReturnType<typeof useProductLocalUseCase>,
    unknown
  >;

  beforeEach(async () => {
    hook = renderHook(() => useProductLocalUseCase(), {
      wrapper: createWrapper(),
    });
  });

  afterEach(async () => {
    const { result } = hook;
    await act(async () => {
      result.current.products.forEach(async (product) => {
        await result.current.removeProduct(product.id);
      });
    });
    await act(async () => {
      await result.current.setProduct({ id: "", name: "", price: 0 });
    });
  });

  it("should create a product", async () => {
    const { result } = hook;
    await act(async () => {
      result.current.setProduct({ id: "", name: "Test1", price: 1 });
    });
    await act(async () => {
      result.current.addProductOrUpdate();
    });
    await waitFor(async () => {
      expect(
        result.current.products.map((product) => ({
          name: product.name,
          price: product.price,
        }))
      ).toContainEqual(
        {
          name: "Test1",
          price: 1,
        },
      );
    });
  });

  it("should delete a product", async () => {
    const { result } = hook;

    expect(result.current.products).toEqual([]);
    await act(async () => {
      result.current.setProduct({ id: "", name: "T", price: 100 });
    });
    await act(async () => {
      result.current.addProductOrUpdate();
    });
    await waitFor(async () => {
      expect(result.current.products).not.toContainEqual({
        id: "1",
        name: "Test Product",
        price: 100,
      });
    });

    await act(async () => {
      result.current.removeProduct("1");
    });
    await waitFor(async () => {
      expect(result.current.products).not.toContainEqual({
        id: "1",
        name: "Test Product",
        price: 100,
      });
    });
  });
});
