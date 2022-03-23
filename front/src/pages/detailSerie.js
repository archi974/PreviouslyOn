import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import "./detailSerie.css"

export default function DetailSerie() {
    const [displaySerie, setDisplaySerie] = useState([]);
    const [imageSerie, setImageSerie] = useState([]);
    let { id } = useParams(); //récupère l'id de la série dans l'url
    let imageArray = [];

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        fetch(`https://api.betaseries.com/shows/episodes?client_id=${process.env.REACT_APP_API_KEY}&id=${id}&access_token=${accessToken}`)
            .then(res => res.json())
            .then(res => {
                console.log(res),
                    res.episodes.forEach((episode, i) => {
                        imageArray.push(fetch(`https://api.betaseries.com/pictures/episodes?client_id=${process.env.REACT_APP_API_KEY}&id=${episode.id}`)
                            .then((image) => episode.img = image.url))
                    });
                Promise.all(imageArray).then(() => {
                    setImageSerie(res.episodes);
                })
                setDisplaySerie(res.episodes)
            })
            .catch((err) => console.log("error: " + err));

    }, [])

    const watchedEpisode = (EpisodeId) => { // ajoute l'épisode dans la liste de vue
        const accessToken = localStorage.getItem('token');
        fetch(`https://api.betaseries.com/episodes/watched?client_id=${process.env.REACT_APP_API_KEY}&id=${EpisodeId}&token=${accessToken}`, {
            method: "POST"
        })
        .then(res => res.json())
        .catch((err) => console.log("error: " + err));
        window.location.reload();
   
    }
    const noWatchedEpisode = (EpisodeId) => { // supprimer l'épisode de la liste de vue
        const accessToken = localStorage.getItem('token');
        fetch(`https://api.betaseries.com/episodes/watched?client_id=${process.env.REACT_APP_API_KEY}&id=${EpisodeId}&token=${accessToken}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .catch((err) => console.log("error: " + err));
    }

    return (
        <div>
            <Navbar />
            {
                displaySerie.map((res, i) => (
                    <div key={i}>
                        {
                            res.user.seen === false &&
                            <div>
                                <div className='block' style={{ backgroundColor: "rgb(97, 76, 192)" }}>
                                    <div className='imageEpisode'>
                                        <p>Episode : {res.episode} saison {res.season}</p>
                                        <img src={res.img} alt="" />
                                    </div>
                                    <div style={{ width: '80%' }}>
                                        <h2>{res.title}</h2>
                                        <p>Note : {Math.round(res.note.moyenne)}/5</p>
                                        <p>la date de diffusion : {res.date}</p>
                                        <p>Résumé : {res.description}</p>
                                        <div className='checkbox'>
                                            <label>Déjà vue ? </label>
                                            {
                                                res.user.seen === false ?
                                                    <input type="checkbox" onClick={() => watchedEpisode(res.id)} />
                                                    :
                                                    <input type="checkbox" onClick={() => noWatchedEpisode(res.id)} onChange={() => false} checked />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                ))
            }
        </div>
    );
}