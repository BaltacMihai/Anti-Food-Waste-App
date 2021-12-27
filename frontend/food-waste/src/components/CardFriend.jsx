import React, { useState } from "react";
import EditFriend from "./EditFriend";

function CardFriend(props) {
  return ReturnCardFriend(
    props.photo,
    props.name,
    props.category,
    props.id,
    props.refresh,
    props.val,
    props.fullDetails
  );
}

function ReturnCardFriend(
  photo,
  name,
  category,
  id,
  refresh,
  val,
  fullDetails
) {
  const [edit, setEdit] = useState(false);

  const refreshFriend = {
    value: val,
    action: refresh,
  };

  if (edit === false)
    return (
      <div className="card">
        <div className="card__friend">
          <img src={photo} alt="" className="card__friend__photo" />
          <div className="card__friend__info">
            <div className="card__friend__info__name">{name}</div>
            <div className="card__friend__info__category">{category}</div>
          </div>
        </div>
        <div className="card__actions">
          <div className="card__actions__list">
            <span className="icon-list2"></span>
          </div>
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
              deleteFriend(id);
              refresh(!val);
            }}
          >
            <span className="icon-bin2"></span>
          </div>
        </div>
      </div>
    );
  else return returnEditFriend(fullDetails, setEdit, refreshFriend);
}

function deleteFriend(id) {
  console.log(id);
  if (id) {
    const URL =
      "http://localhost:8081/api/friendshipRelation/deleteFriend/" + id;

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

function returnEditFriend(fullDetails, setEdit, refreshFriend) {
  return (
    <EditFriend data={fullDetails} setEdit={setEdit} refresh={refreshFriend} />
  );
}

export default CardFriend;
