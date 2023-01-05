import React from "react"

export default class TodoList extends React.Component {
    state = {
        items: [
            { key: 1, description: "Dormi", done: false },
            { key: 2, description: "Lavati", done: true },
            { key: 3, description: "Vai a fare la spesa", done: false },
            { key: 4, description: "Fai la lavatrice", done: true },
            { key: 5, description: "Pranza", done: true },
        ]
    }
    handleInput = (event) => {
        event.preventDefault()
        if (event.target.elements.description.value) {
            let newTodo = {
                key: this.state.items.length + 1,
                description: event.target.elements.description.value,
                done: event.target.elements.done.checked,
            }
        this.setState((prev) => {
            return {
                items: [...prev.items, newTodo]}
        } 
        )
        event.target.elements.description.value = "";
        event.target.elements.done.checked = false;
        }

    }

    handleDeleteAll = () => {
        this.setState(() => {
           return {items: []}
        })
    }

    handleDeleteTodo = (event) => {
        this.setState((prev) => {
            let index = prev.items.findIndex(el => el.key === Number(event.target.id))
            prev.items.splice(index, 1)
            return {...prev}
         })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleInput}>
                    <label htmlFor="description">New Todo </label>
                <input type="text" name="description"></input>
                <label htmlFor="done"> Done </label>
                <input type="checkbox" name="done"></input>
                    <button>ADD TODO</button>
                    <button type="button" onClick={this.handleDeleteAll}>Reset</button>
                </form>
                <ul>
                    {this.state.items.map((item) => {
                        return (
                                <li key={item.key}>{item.description} <span>{item.done ? "Completato" : ""}</span> <button id={item.key} onClick={this.handleDeleteTodo}>Delete Todo</button></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}