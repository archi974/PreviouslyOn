import React, { useState } from 'react'

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [memberId, setMemberId] = useState([]);
    let idArray = [];

    const onSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.betaseries.com/members/search?client_id=${process.env.REACT_APP_API_KEY}&login=%${searchQuery}`)
        .then(res => res.json())
        .then(res => {
            res.users.forEach((userinfo) => {
                idArray.push(userinfo.id)
            });
            Promise.all(idArray).then(() => {
                setMemberId(idArray)
            })
            setMemberList(res)
        })
    };
const addFriend = (idUser) => {
    const accessToken = localStorage.getItem('token');
    fetch(`https://api.betaseries.com/friends/friend?client_id=${process.env.REACT_APP_API_KEY}&token=${accessToken}&id=${idUser}`, {
        method: "POST"
    })
    .then(res => res.json())
    .catch((err) => console.log("error: " + err));
    location.reload();
};

    return (
        <div>
            <form
                action="/"
                method="get"
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <input
                    value={searchQuery}
                    onInput={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search friend"
                />
                <button type="submit">Search</button>
            {
                memberList.users?.map((res, i) => (
                    <div key={i}>
                    {
                        <div>
                            <ul>
                                <li>{res.login}</li>
                                <button onClick={() => addFriend(memberId[i])} >devient mon ami !</button>
                            </ul>
                        </div>
                    }
                    </div>
                ))
            }
            </form>
        </div>
    );
};

export default SearchBar;