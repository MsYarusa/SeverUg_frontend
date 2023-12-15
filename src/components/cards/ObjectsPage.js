import React, { useState } from "react";

import "./objectStyles/ObjectsPage.css";

const ObjectsPage = ({
  AddUpdateObject,
  DeleteObject,
  ObjectFilter,
  ObjectsList,
  filterHandler,
  searchHandler,
  objects,
  list,
}) => {
  // РАБОТА С ДАННЫМИ (ОКНА)
  // хранение информации об окнах
  const [addObject, setAddObject] = useState(false);
  const [updateObject, setUpdateObject] = useState(false);
  const [deleteObject, setDeleteObject] = useState(false);
  const [deleteObjectById, setDeleteObjectById] = useState(-1);
  const [updateObjectById, setUpdateObjectById] = useState(null);

  //ОТКРЫТИЕ ОКОН
  // открытие окна добавления
  const addObjectHandler = () => {
    setAddObject(true);
  };

  // открытие окна обновления
  const updateObjectHandler = (id) => {
    let object = objects.find((object) => object.id === id);
    setUpdateObjectById(object);
    setUpdateObject(true);
  };

  // открытие окна удаления
  const deleteObjectHandler = (id) => {
    setDeleteObjectById(id);
    setDeleteObject(true);
  };

  //ЗАКРЫТИЕ ОКОН
  // закрытие окна добавления
  const cancelAddHandler = () => {
    setAddObject(false);
  };

  // закрытие окна обновления
  const cancelUpdateHandler = () => {
    setUpdateObject(false);
  };

  // закрытие окна удаления
  const cancelDeleteHandler = () => {
    setDeleteObject(false);
  };

  return (
    <div className="page">
      {ObjectFilter && (
        <ObjectFilter onFilter={filterHandler} isSmall={false} />
      )}
      <ObjectsList
        searchHandler={searchHandler}
        buttonsHandlers={{
          add: addObjectHandler,
          update: updateObjectHandler,
          delete: deleteObjectHandler,
        }}
        list={list}
        onFilter={filterHandler}
      />
      {addObject && <AddUpdateObject cancelHandler={cancelAddHandler} />}
      {updateObject && (
        <AddUpdateObject
          cancelHandler={cancelUpdateHandler}
          data={updateObjectById}
        />
      )}
      {deleteObject && (
        <DeleteObject
          cancelHandler={cancelDeleteHandler}
          id={deleteObjectById}
        />
      )}
    </div>
  );
};

export default ObjectsPage;
