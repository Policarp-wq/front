import { useEffect, useState, useRef } from "react";
import { RangeSelector } from "../Range";
import { Button } from "../Button";
import { Dropdown, type Option } from "../Dropdown";
import { client } from "../../utils";
import { useDispatch, useSelector } from "../../storage/store";
import { selectItems } from "../../storage/cartSlice";
import { useNavigate } from "react-router-dom";
import type { ProductFilter } from "../../models/types";
import { loadFilteredProducts, selectProducts } from "../../storage/productsSlice";


export const VendingHead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opt, setOpt] = useState<Option[]>([]);
  const items = useSelector(selectItems);
  const products = useSelector(selectProducts)
  const mx = products.length == 0 ? 0 : products.map(p => p.price).reduce((prev, cur) => cur > prev ? cur : prev);

  const [filter, setFilter] = useState<ProductFilter>({
    brand: null,
    minPrice: 0,
    maxPrice: mx
  });

  //для предотвращения первого вызова
  const isFirstRender = useRef(true);

  const handleSelect = (val: string) => {
    setFilter(f => ({ ...f, brand: val === "any" ? null : val }));
  };
  const handleMaxChanged = (val : number) => {
    setFilter(f => ({ ...f, maxPrice: val }));
  };
  useEffect(() => {
    client.getBrands().then(brands => {
      setOpt([
        { name: "Любой", value: "any" },
        ...brands.map(b => ({ name: b.name, value: b.name }))
      ]);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatch(loadFilteredProducts(filter))
  }, [filter, dispatch]);

  return (
    <div className="w-full border-b-1 pb-[20px] border-b-gray-300 max-w-[100%]">
      <div
        className="grid gap-[20px] "
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gridTemplateAreas: `
            "name . import"
            "brand range selected"
          `,
        }}
      >
        <h1 style={{ gridArea: "name" }} className="text-2xl text-left font-semibold mb-4">Газированные напитки</h1>
        <div style={{ gridArea: "brand" }}>
          <label className="text-[16px] block text-left mb-1">Выберите бренд</label>
          <Dropdown options={opt} onSelect={handleSelect} />
        </div>

        <div style={{ gridArea: "range" }} className="flex flex-col justify-center items-center h-m">
          <label className="flex flex-col items-start w-full">
            <span className=" text-[16px] font-medium mb-1">Стоимость</span>
            <RangeSelector min={0} max={mx} onChange={handleMaxChanged} />
          </label>
        </div>

        <div style={{ gridArea: "import" }} className="flex justify-end items-center h-full">
          <Button theme="gray" text="Импорт" addStyle="w-full h-[60%] max-w-[300px] font-bold" />
        </div>

        <div style={{ gridArea: "selected" }} className="flex justify-end items-center h-full">
            <Button theme="green" text={"Выбрано: " + items.length} addStyle="w-full h-[60%] max-w-[300px]  font-bold" onClick={() => navigate("/order")}/>
        </div>
      </div>
    </div>
  );
};