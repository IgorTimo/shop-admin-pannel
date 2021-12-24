import React, { useState } from "react";
import uuid from "react-uuid";
import AddItem from "./AddItem.js";
import Item from "./Item.js";
import ItemsList from "./ItemsList.js";

export default function Shop() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [emptyFieldError, setEmptyFieldError] = useState("");

    const list = items.map((item, index) => {
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
        if(desc.trim() === ""){
            setEmptyFieldError("А описание кто заполнять то будет?");
            return;
        }
        const newItems = items.slice();
        newItems.push({ id: uuid(), name, desc });
        setItems(newItems);
        setName("");
        setDesc("");
        setEmptyFieldError("");

    }

    function handleChangeName(e){
        setName(e.target.value)
    }

    function handleChangeDesc(e){
        setDesc(e.target.value)
    }

    function handeleClikDelete(id) {
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <>
            <AddItem 
            name = {name} 
            desc = {desc}
            emptyFieldError = {emptyFieldError}
            onFormSubmit = {handleFormSubmit}
            onChangeName = {handleChangeName} 
            onChangeDesc = {handleChangeDesc}        
            />

            <div hidden={items.length}>
                <p className="ui-title">Добавьте первый товар</p>
            </div>

            <ItemsList list={list} />
        </>
    );
}
