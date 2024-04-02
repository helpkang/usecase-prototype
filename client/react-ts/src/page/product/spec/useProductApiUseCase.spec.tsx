import {
  renderHook,
  act,
  waitFor,
  RenderHookResult,
} from "@testing-library/react";


import { createWrapper } from "../../../share/test/createWrapper";
import { userProductServiceMock } from "./ProductsService.mock";
import sinon from "ts-sinon";
import { useProductApiUseCase } from "../useProductApilUseCase";
describe("useProductUseCase", () => {
  let hook: RenderHookResult<ReturnType<typeof useProductApiUseCase>, unknown>;

  beforeEach(async () => {
    userProductServiceMock();
    hook = renderHook(
      () => {
        return useProductApiUseCase();
      },
      {
        wrapper: createWrapper(),
      }
    );
  });

  afterEach(async () => {
    const { result } = hook;
    await act(async () => {
      result.current.products?.forEach(async (product) => {
        await result.current.removeProduct(product.id);
      });
    });
    await act(async () => {
      await result.current.setProduct({ id: 0, name: "", price: 0 });
    });
    sinon.restore();
    sinon.reset();
  });

  it("should create a product", async () => {
    const { result } = hook;
    await act(async () => {
      result.current.setProduct({ id: 0, name: "Test1", price: 1 });
    });
    await act(async () => {
      result.current.addProductOrUpdate();
    });
    await waitFor(async () => {
      expect(
        result.current.products?.map((product) => ({
          name: product.name,
          price: product.price,
        }))
      ).toContainEqual({
        name: "Test1",
        price: 1,
      });
    });
  });

  it("should delete a product", async () => {
    const { result } = hook;
    await waitFor(async () => {
      expect(result.current.products).toEqual([]);
    });
    await act(async () => {
      result.current.setProduct({ id: 0, name: "T", price: 100 });
    });
    await act(async () => {
      result.current.addProductOrUpdate();
    });
    await waitFor(async () => {
      expect(result.current.products).not.toContainEqual({
        id: "1",
        name: "T",
        price: 100,
      });
    });

    await act(async () => {
      result.current.removeProduct(1);
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
