import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import SearchBar from '../components/searchBar';
import "./profile.css"


export default function Profile() {
    const [friendList, setFriendList] = useState([]);
    const [userId, setUserId] = useState([]);
    const [reloadPage, setReloadPage] = useState([]);
    let idUserArray = [];
    let search = '';

    useEffect( () => {
        const accessToken = localStorage.getItem('token')

        fetch(`https://api.betaseries.com/friends/list?client_id=${process.env.REACT_APP_API_KEY}&token=${accessToken}`)
        .then(res => res.json())
        .then(res => {
            res.users.forEach(idUser => {
                idUserArray.push(idUser.id)
            });
            Promise.all(idUserArray).then(() => {
                setUserId(idUserArray)
            })
            setFriendList(res.users)
        })
        .catch((err) => console.log("error: " + err));


  
    }, [])

    const blockFriend = (id) => {
        const accessToken = localStorage.getItem('token');
        fetch(`https://api.betaseries.com/friends/block?client_id=${process.env.REACT_APP_API_KEY}&token=${accessToken}&id=${id}`,{
            method:'POST'
         })
        .then(res => res.json())
        .then(res => setReloadPage(res))
        .catch((err) => console.log("error: " + err));
        Promise.all(reloadPage).then(() => {
            window.location.reload();
        })
    }

    const deleteFriend = () => {
        const accessToken = localStorage.getItem('token');
        fetch(`https://api.betaseries.com/friends/friend?client_id=${process.env.REACT_APP_API_KEY}&token=${accessToken}&id=${userId}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(res => setReloadPage(res))
        .catch((err) => console.log("error: " + err));
        Promise.all(reloadPage).then(() => {
            location.reload();
        })
    }

    return (
        <div>
            <Navbar />
            <div className='main'>
                <div className='searchBar'>
                 <SearchBar />
                </div>
                {
                friendList[0] ?
                    friendList.map((res, i) => (
                        <div key={i}>
                        {
                            <div className='block' style={{ backgroundColor: "rgb(97, 76, 192)" }}>
                                <p>{res.login}</p>
                                <p>xp : {res.xp}</p>
                                <input type={'button'} value="bloquer" onClick={() => blockFriend(res.id)} />
                                <input type={'button'} value="X" onClick={() => deleteFriend()} />
                            </div>
                        }
                        </div>
                    ))
                :
                    <div>
                        <p>Vous n'avez pas d'ami... Vous voulez un curly ?</p>
                    </div>
                }
                {/* <input type={'button'} value="débloquer cet ami" onClick={() => deblockFriend(userId)} /> */}
            </div>
            
        </div>
    )
}