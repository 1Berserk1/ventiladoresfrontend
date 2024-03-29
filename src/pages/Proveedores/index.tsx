import Page from "@/components/Page";
import { ProveedoresUX } from "./ProveedoresUX";
import { ProveedorFormUX } from "./ProveedorFormUX";
import { FC, useState } from "react";
import { useGetAllQuery, useAddNewMutation, useGetByIdQuery } from "@/store/services/provServices";
import { useNavigate, useParams } from "react-router-dom";

export const Proveedores: FC = () => {
  const { data: proveedores, isLoading, error } = useGetAllQuery([]);
  const navigate = useNavigate();
  return (
    <Page>
      <h1>Proveedores</h1>
      <ProveedoresUX
        proveedores={proveedores}
        isLoading={isLoading}
        error={error?.toString() || ""}
        onViewProveedorClick={(id: string): void => {
          navigate(`/proveedores/${id}`);
        }}
        onAddClick={(): void => {
          navigate(`/proveedores/new`);
        }}
      />
    </Page>
  );
};

export const ProveedorForm: FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [identidad, setIdentidad] = useState("");
  const [ciudad, setciudad] = useState("");
  const [newProveedor] = useAddNewMutation();
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    switch (name) {
        case "nombre":
        setNombre(value);
        break;
        case "identidad":
        setIdentidad(value);
        break;
        case "ciudad":
        setciudad(value);
        break;
        default:
        break;
    }
  };
  const onClickHandler = async ()=>{
    const result = await newProveedor({nombre,identidad,ciudad}).unwrap();
    console.log(result);
    navigate("/proveedores");
  }
  return <ProveedorFormUX
    nombre={nombre}
    identidad={identidad}
    ciudad={ciudad}
    onChangeHandler={onChangeHandler}
    onClickHandler={onClickHandler}
  />;
};

export const ProveedorView: FC = () => {
  const { id = '' } = useParams();
  const {data: proveedor, isLoading, error} = useGetByIdQuery(id);
  return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>{error?.toString() || ''}</div>}
    {proveedor && <div>{JSON.stringify(proveedor)}</div>}
    </>
  );
};
