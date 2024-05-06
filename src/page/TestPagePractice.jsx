import { useState } from "react";
import Header from "../component/HeaderComponent";

export default function TestPagePractice() {

    const [count, setCount] = useState(1);
    const increment = () => {

        setCount(count + 1)
    }
    const decrement = () => {
        if (count > 1)
            setCount(count - 1)
    }
    return (
        <div>
            <Header></Header>


            <p>Number of Click: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}