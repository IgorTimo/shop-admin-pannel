export default function AddItem(props) {
    return (<form onSubmit={props.onFormSubmit}>
        <div>
            <label htmlFor="name">Название товара</label>
            <input
                id="name"
                type="text"
                value={props.name}
                placeholder="Название товара"
                className="ui-textfield"
                onChange={props.onChangeName}
            />
        </div>
        <div>
            <label htmlFor="desc">Описание товара</label>
            <input
                id="desc"
                type="text"
                value={props.desc}
                placeholder="Описание товара"
                className="ui-textfield"
                onChange={props.onChangeDesc}
            />
        </div>
        <div className="form-footer">
            <div className="validation" hidden={props.emptyFieldError.length === 0}>
                {props.emptyFieldError}
            </div>
            <input type="submit" className="ui-button" value="Добавить" />
        </div>
    </form>)
}