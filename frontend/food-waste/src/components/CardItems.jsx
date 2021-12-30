import React, { useState } from "react";
import { FacebookShareButton } from "react-share";
import EditItems from "./EditItems";

function CardItems(props) {
  const refreshAction = {
    value: props.val,
    action: props.refresh,
  };
  return ReturnCarditem(
    props.item.photo,
    props.item.name,
    props.item.category,
    props.item.description,
    props.item.expirationDate,
    props.item.isAvailable,
    props.item,
    refreshAction
  );
}

function ReturnCarditem(
  photo,
  name,
  category,
  description,
  expirationDate,
  isAvailable,
  allInfos,
  refreshAction
) {
  const [edit, setEdit] = useState(false);
  if (edit === false) {
    return (
      <div className="card">
        <div className="card__item">
          <img className="card__item__photo" src={photo}></img>
          <div className="card__item__content">
            <p className="card__item__content__title">{name}</p>
            <p className="card__item__content__category">{category}</p>
            <p className="card__item__content__description">{description}</p>
          </div>
        </div>
        <p className="card__item__expirationDate">
          {generateData(expirationDate)}
        </p>
        <div className="card__actions">
          <div
            className="card__actions__edit"
            onClick={() => {
              setEdit(true);
            }}
          >
            <span className="icon-pencil"></span>
          </div>
          <div
            className="card__actions__delete"
            onClick={() => {
              deleteItem(allInfos);
              refreshAction.action(!refreshAction.value);
            }}
          >
            <span className="icon-bin2"></span>
          </div>
          {returnShare(
            name,
            category,
            description,
            isAvailable,
            allInfos,
            refreshAction
          )}
        </div>
      </div>
    );
  } else {
    return returnEditItem(allInfos, setEdit, refreshAction);
  }
}

function returnShare(
  name,
  category,
  description,
  isAvailable,
  allInfos,
  refreshAction
) {
  if (isAvailable) {
    return (
      <div className="row">
        <div
          className="card__actions__available card__actions__available--active"
          onClick={() => {
            changeAvailability(allInfos);
            refreshAction.action(!refreshAction.value);
          }}
        >
          <span className="icon-share"></span>
        </div>

        <FacebookShareButton
          url={"https://github.com/BaltacMihai/Anti-Food-Waste-App"}
          quote={"I don't want to waste " + name + ", so i share with you"}
          hashtag={"#" + category}
          description={description}
          className="card__actions__socialMedia"
        >
          <span className="icon-share2"></span>
        </FacebookShareButton>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div
          className="card__actions__available"
          onClick={() => {
            changeAvailability(allInfos);
            refreshAction.action(!refreshAction.value);
          }}
        >
          <span className="icon-share"></span>
        </div>
      </div>
    );
  }
}

async function changeAvailability(allInfos) {
  const URL = "http://localhost:8081/api/item/putItem";

  const body = {
    id: allInfos.id,
    user_id: allInfos.user_id,
    name: allInfos.name,
    description: allInfos.description,
    quantity: allInfos.quantity,
    category: allInfos.category,
    expirationDate: allInfos.expirationDate,
    isAvailable: !allInfos.isAvailable,
  };

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteItem(allInfos) {
  if (allInfos.id && allInfos.user_id) {
    const URL =
      "http://localhost:8081/api/Item//deleteItemById/" +
      allInfos.id +
      "/" +
      allInfos.user_id;

    fetch(URL, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function returnEditItem(fullDetails, setEdit, refreshAction) {
  return (
    <EditItems
      infos={fullDetails}
      setEdit={setEdit}
      refreshAction={refreshAction}
    />
  );
}

//this function iterpret the data format in one more common and easy to read
function generateData(data) {
  return data.slice(8, 10) + "." + data.slice(5, 7) + "." + data.slice(0, 4);
}
export default CardItems;
