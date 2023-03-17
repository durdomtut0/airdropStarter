function Card({name, job}) {
    return (
        <div className="card">
            <img src="logo192.png" />
            <div className="container">
                <h4><b>{name}</b></h4>
                <p>{job}</p>
            </div>
        </div>
    )
}

export default Card;