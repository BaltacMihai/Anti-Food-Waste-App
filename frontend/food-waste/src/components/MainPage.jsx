import React, { useState } from "react";
import CardFriend from "./CardFriend";
import CardItems from "./CardItems";

function MainPage(props) {
  return ReturnMainPage(props.currentUser);
}

//function that return the elements of the main page
function ReturnMainPage(infos) {
  const [refresh, setRefresh] = useState(false);

  //friends is the array which contain all the friends of the current user

  let friends = CreateFriendsList(infos, refresh, setRefresh);

  //items is the array which contain all the items of the current user
  let items = CreateItemsList(infos);

  return (
    <div className="main__container">
      {returnFriendPart(friends, refresh, setRefresh)}

      {returnItemsPart(items)}
    </div>
  );
}

//#region  Items

//return the elements from the right part( the part with the items)
function returnItemsPart(data) {
  return (
    <div className="main__container__food">
      <p className="main__container__food__title">Food:</p>
      <div className="main__container__food__list">
        {/* {returnFilterOptions(data)} */}
        <div className="main__container__food__list__items">
          {returnItemList(data)}
        </div>
      </div>
    </div>
  );
}

//function that return the filter part
function returnFilterOptions(data) {
  return (
    <div className="filter">
      <div className="filter__options">{generateFilterOptions(data)}</div>
      <div className="filter__add">
        <span className="icon-plus"></span>
      </div>
    </div>
  );
}

// return the filter options
function generateFilterOptions(data) {
  return remove_duplicates(data)?.map((element) => {
    return <div className="filter__option">{element}</div>;
  });
}

//this function remove the duplicates and add the "All categories"
function remove_duplicates(arr) {
  let obj = {};
  let ret_arr = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i].category] = true;
    }
    for (let key in obj) {
      ret_arr.push(key);
    }
    ret_arr.unshift("All categories");
    return ret_arr;
  }
}

function returnItemList(data) {
  console.log(data);
  return data?.map((item) => {
    return (
      <CardItems
        photo={item.photo}
        name={item.name}
        description={item.description}
        category={item.category}
        expirationDate={item.expirationDate}
      />
    );
  });
}

// we get through API the items based on current user
function CreateItemsList(infos) {
  let [item, setItem] = useState(null);
  const URL = "http://localhost:8081/api/item/getAllItemsByUserId/" + infos.id;

  if (item == null)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setItem(result);
      })
      .catch((error) => {
        console.log(error);
      });

  if (item != null) {
    return item;
  }
}

//#endregion

//#region Friend

// return the left part ( The friends part)
function returnFriendPart(data, bool, refresh) {
  return (
    <div className="main__container__friends">
      <p className="main__container__friends__title"> Friends: </p>
      <div className="main__container__friends__list">
        {returnFriendList(data, bool, refresh)}
      </div>
    </div>
  );
}

//return the generated Friend List
function returnFriendList(data, bool, refresh) {
  {
    return data?.map((friend) => {
      return (
        <CardFriend
          fullDetails={friend}
          photo={friend.User.photo}
          name={friend.User.name}
          category={friend.category}
          id={friend.id}
          refresh={refresh}
          val={bool}
        />
      );
    });
  }
}

// there I call the api to get the friends from the current user
function CreateFriendsList(infos, refresh, setRefresh) {
  const [friend, setFriend] = useState(null);
  let temp = refresh;
  const URL =
    "http://localhost:8081/api/friendshipRelation/getFriendshipRel/" + infos.id;

  if (friend == null || temp == true)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, refresh);
        setRefresh(false);
        temp = false;
        setFriend(result);
      })
      .catch((error) => {
        console.log(error);
      });

  if (friend != null) {
    return friend;
  }
}

//#endregion

export default MainPage;
