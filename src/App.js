import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get('https://randomuser.me/api/?results=500')
      .then((respone) => {
        setUsers(respone.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getUsers()
  }, [])

  const [value, setValue] = useState('');
  const [favoriteUser, setFavoriteUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  function inputValueChange(e) {
    setValue(e.target.value)
  }

  const filterName = users.filter((user) => {
    const fullName = (`${user.name.first} ${user.name.last}`).toLowerCase();
    const regVal = value.toLowerCase();
    return fullName.includes(regVal)
  })

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === 'user__element') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
    if (e.target.className === 'favorite') {
      e.target.style.boxShadow = '0 4px 3px green'
    }
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
  }

  const dragStartHandler = (e, user) => {
    let fullName = `${user.name.first} ${user.name.last}`
    // setFavoriteUser((prevFavoritUser) => {
    //   return [...[prevFavoritUser], [fullName],]
    // })
    setFavoriteUser(fullName)
  }

  function dragEndHandler(e) {
    e.preventDefault();
    if (e.target.className === 'user__element') {
      e.target.style.boxShadow = ''
    }
    if (e.target.className === 'favorite') {
      e.target.style.boxShadow = ''
    }
  }

  function dropHandler(e) {
    e.preventDefault();

  }

  function dropCardHandler(e) {
    e.preventDefault();
    if (e.target.className === 'favorite') {
      e.target.style.boxShadow = ''
    }
    setCurrentUser((prevFavoritUser) => {
      return [...prevFavoritUser, [favoriteUser]]
    }
    )
  }

  return (
    <div className="App">
      <p>Пользователей выведено: {users.length > 0 ? users.length : 'Loading...'}</p>
      <input className="search" placeholder='Введите имя' value={value || ''} onChange={inputValueChange} />
      <section className='board'>
        <div className='board__user'>
          <details>
            <summary>Age users 0-10</summary>
            {
              filterName.map((user) => {
                if (user.registered.age <= 10) {
                  return (
                    <div className='users'>
                      <div className='user'>
                        <div
                          onDragOver={(e) => dragOverHandler(e)}
                          onDragLeave={(e) => dragLeaveHandler(e)}
                          onDragStart={(e) => {
                            dragStartHandler(e, user)
                          }}
                          onDragEnd={(e) => dragEndHandler(e)}
                          onDrop={(e) => dropHandler(e, user)}
                          draggable={true}
                          className='user__element'
                          key={user.login.username}
                        >{user.name.first} {user.name.last}</div>

                      </div>
                      <div className='user__info'>
                        <details>
                          <summary>User info</summary>
                          <div className='user__card'>
                            <img className='user__img' src={user.picture.medium}></img>
                            <div className='user__descr'>
                              <h2> {`${user.name.first} ${user.name.last} . Дата регистрации: ${user.registered.date.substring(0, 10)}`}</h2>
                              <p> {user.email}</p>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>

                  )
                }
              })
            }
          </details>
          <details>
            <summary>Age users 11-20</summary>
            {
              filterName.map((user) => {
                if (user.registered.age <= 20 && user.registered.age >= 11) {
                  return (
                    <div className='users'>
                      <div className='user'>
                        <div
                          onDragOver={(e) => dragOverHandler(e)}
                          onDragLeave={(e) => dragLeaveHandler(e)}
                          onDragStart={(e) => {
                            dragStartHandler(e, user)
                          }}
                          onDragEnd={(e) => dragEndHandler(e)}
                          onDrop={(e) => dropHandler(e, user)}
                          draggable={true}
                          className='user__element'
                          key={user.login.username}
                        >{user.name.first} {user.name.last}</div>
                      </div>
                      <div className='user__info'>
                        <details>
                          <summary>User info</summary>
                          <div className='user__card'>
                            <img className='user__img' src={user.picture.medium}></img>
                            <div className='user__descr'>
                              <h2> {`${user.name.first} ${user.name.last} . Дата регистрации: ${user.registered.date.substring(0, 10)}`}</h2>
                              <p> {user.email}</p>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  )
                }
              })
            }
          </details>
          <details>
            <summary>Age users 20-30</summary>
            {
              filterName.map((user) => {
                if (user.registered.age <= 30 && user.registered.age >= 21) {
                  return (
                    <div className='users'>
                      <div className='user'>
                        <div
                          onDragOver={(e) => dragOverHandler(e)}
                          onDragLeave={(e) => dragLeaveHandler(e)}
                          onDragStart={(e) => {
                            dragStartHandler(e, user)
                          }}
                          onDragEnd={(e) => dragEndHandler(e)}
                          onDrop={(e) => dropHandler(e, user)}
                          draggable={true}
                          className='user__element'
                          key={user.login.username}
                        >{user.name.first} {user.name.last}</div>
                      </div>
                      <div className='user__info'>
                        <details>
                          <summary>User info</summary>
                          <div className='user__card'>
                            <img className='user__img' src={user.picture.medium}></img>
                            <div className='user__descr'>
                              <h2> {`${user.name.first} ${user.name.last} . Дата регистрации: ${user.registered.date.substring(0, 10)}`}</h2>
                              <p> {user.email}</p>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  )
                }
              })
            }
          </details>
        </div>
        <div
          onDragOver={(e) => { dragOverHandler(e) }}
          onDrop={(e) => dropCardHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          className='favorite'
        >
          <p>Избранные: </p>
          <ul>
            {
              currentUser.map(user => <li>{user}</li>)
            }
          </ul>

        </div>
      </section>
    </div >
  );
}

export default App;
