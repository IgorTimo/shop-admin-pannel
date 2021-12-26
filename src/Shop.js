import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import AddItem from "./AddItem.js";
import Item from "./Item.js";
import ItemsList from "./ItemsList.js";

export default function Shop() {
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("items")));
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [emptyFieldError, setEmptyFieldError] = useState("");

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
        document.title = items.length ? `${items.length} товаров` : "Товары отсутствуют"
    }, [items])

    const list = items.map((item) => {
        return (
            <li className="ui-item-list" key={item.id}>
                <Item info={item} />
                <button
                    className="item-button"
                    onClick={() => handeleClikDelete(item.id)}
                >
                    Удалить
                </button>
            </li>
        );
    });

    function handleFormSubmit(e) {
        e.preventDefault();
        if (name.trim() === "") {
            setEmptyFieldError("И что нам делать без имени товара?");
            return;
        }
        if (desc.trim() === "") {
            setEmptyFieldError("А описание кто заполнять то будет?");
            return;
        }
        const newItems = items.slice();
        newItems.push({ id: uuid(), name, desc });
        setItems(newItems);
        postOnServer();
        setName("");
        setDesc("");
        setEmptyFieldError("");

    }

    function postOnServer() {
        fetch("https://covid-shop-mcs.herokuapp.com", {
            method: "POST",
            body: JSON.stringify({ name, desc }),
            headers: { "Content-type": "application/json" }
        })
        .then(r => r.json())
        .then(d => console.log(d.message))
        .catch(e => console.error(`Error posting on server is ${e}`))
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDesc(e) {
        setDesc(e.target.value)
    }

    function handeleClikDelete(id) {
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <>
            <AddItem
                name={name}
                desc={desc}
                emptyFieldError={emptyFieldError}
                onFormSubmit={handleFormSubmit}
                onChangeName={handleChangeName}
                onChangeDesc={handleChangeDesc}
            />

            <div hidden={items.length}>
                <p className="ui-title">Добавьте первый товар</p>
            </div>

            <ItemsList list={list} />
        </>
    );
}
