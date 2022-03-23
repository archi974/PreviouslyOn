import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { useParams, Link } from 'react-router-dom';
import Arcane from "../images/arcane2.jpg"
import "./home.css"

export default function Home() {
    const [serie, setSerie] = useState([]);

    let { token } = useParams(); //récupère le token dans l'url
    localStorage.setItem('token', token);

    useEffect(() => {

        fetch(`https://api.betaseries.com/shows/list?client_id=${process.env.REACT_APP_API_KEY}&limit=9&order=popularity`)
            .then(res => res.json())
            .then(res => (
                console.log(res.shows),
                setSerie(res.shows)
            ))
            .catch((err) => console.log("error: " + err));

    }, [])

    const favorie = (id) => {
        console.log(id);
        const accessToken = localStorage.getItem('token');
        fetch(`https://api.betaseries.com/shows/favorite?client_id=${process.env.REACT_APP_API_KEY}&id=${id}&token=${accessToken}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .catch((err) => console.log("error: " + err));
    }

    // const unratedEpisode = (EpisodeId) => { // récupère la liste des épisodes vue
    //     const accessToken = localStorage.getItem('token');
    //     fetch(`https://api.betaseries.com/episodes/unrated?client_id=${process.env.REACT_APP_API_KEY}&token=${accessToken}`, {
    //         method: "GET"
    //     })
    //     .then(res => res.json())
    //     .catch((err) => console.log("error: " + err));
    // }

    // const archive = () => {
    //     fetch(`https://api.betaseries.com/shows/archive?client_id=${process.env.REACT_APP_API_KEY}&token=${token}`, {method: 'POST'})
    //     .then((res) => console.log(res))
    // };

    return (

        <div className='body' >
            <Navbar />
            <div className='banner'>
                <img src={Arcane} alt="Jinx" />
            </div>
            {
                serie.map((res, i) => (
                    <div key={i} >

                        {
                            res.title ? <div >

                                <div className='test' >
                                    <div className='pic' >
                                        <img src={res.images.b ? res.images.banner : res.images.show} alt="image" />
                                    </div>
                                    <div className='content'>
                                        <h1>{res.title}</h1>
                                        {res.seasons !== null && <p>Nombre de saison : {res.seasons} saisons</p>}
                                        {res.episodes !== null && <p>Nombre d'épisode : {res.episodes} épisodes</p>}
                                        {res.length !== null && <p>Durée de l'épisode : {res.length}min</p>}
                                        {res.notes.mean !== null && <p>Note : {Math.round(res.notes.mean)}/5</p>}
                                        {res.description !== null && <p>Description : {res.description}</p>}

                                        <p>Genre de la série : {Object.values(res.genres)} </p>
                                        <Link to={`/detail/serie/${res.id}`} >Episodes</Link>
                                        <button onClick={() => favorie(res.id)}><svg width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path></svg></button>
                                        {/* <button onClick={()=>archive()}>archive</button> */}
                                    </div>

                                </div>

                            </div> : <div></div>
                        }
                    </div>
                ))
            }

        </div>
    );
}