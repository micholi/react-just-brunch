const API_URL = 'http://localhost:3001/api'

const setRestaurants = restaurants => {
  return {
    type: 'FETCH_RESTAURANTS',
    restaurants
  }
}

const setRestaurant = restaurant => {
  return {
    type: 'FETCH_RESTAURANT',
    restaurant
  }
}

const addRestaurant = restaurant => {
  return {
    type:'ADD_RESTAURANT',
    restaurant
  }
}

const addLikes = restaurant => {
  return {
    type: 'LIKE_RESTAURANT',
    restaurant
  }
}

const removeRestaurant = restaurant => {
  return {
    type: 'REMOVE_RESTAURANT',
    restaurant
  }
}

const setComments = comments => {
  return {
    type: 'FETCH_COMMENTS',
    comments
  }
}

const addComment = comment => {
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export const fetchRestaurants = () => {
  return dispatch => {
    dispatch({type: 'LOADING_RESTAURANTS'});
      return fetch(`${API_URL}/restaurants`)
      .then(resp => resp.json())
      .then(restaurants => dispatch(setRestaurants(restaurants)))
      .catch(error => console.log(error))
  }
}

export const fetchRestaurant = (restaurantId) => {
	return dispatch => {
		return fetch(`${API_URL}/restaurants/${restaurantId}`)
			.then(response => response.json())
			.then(restaurant => {
				dispatch(setRestaurant([restaurant]));
			})
      .catch(error => console.log(error))
	}
}

export const createRestaurant = (restaurant) => {
  return dispatch => {
    return fetch(`${API_URL}/restaurants`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({restaurant: restaurant})
    })
    .then(response => response.json())
//    .then(handleErrors)
    .then(restaurant => {
      dispatch(addRestaurant(restaurant))
    })
    .catch(error => {
      dispatch({type: 'error'})
    })
  }
}

export const likeRestaurant = (restaurant) => {
  const updatedRestaurant = Object.assign(...restaurant, { likes: restaurant.likes + 1 })
    return dispatch => {
      return fetch(`${API_URL}/restaurants/${restaurant.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({restaurant: updatedRestaurant})
      })
      .then(response => response.json())
      .then(restaurant => {
        dispatch(addLikes(restaurant))
      })
      .catch(error => console.log(error))
  }
}

export const deleteRestaurant = (restaurantId, routerHistory) => {
  return dispatch => {
    return fetch(`${API_URL}/restaurants/${restaurantId}`, {
      method: "DELETE",
    })
    .then(response => {
      dispatch(removeRestaurant(restaurantId));
      routerHistory.replace('/restaurants')
    })
    .catch(error => console.log(error))
  }
}

export const fetchComments = (restaurantId) => {
  return dispatch => {
    dispatch({type: 'LOADING_COMMENTS'});
      return fetch(`${API_URL}/restaurants/${restaurantId}/comments`)
      .then(response => response.json())
      .then(comments => dispatch(setComments(comments)))
      .catch(error => console.log(error))
  }
}

export const createComment = (comment) => {
  return dispatch => {
    return fetch(`${API_URL}/restaurants/${comment.restaurant_id}/comments`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({comment: comment})
    })
    .then(response => response.json())
    .then(comment => {
      dispatch(addComment(comment))
    })
    .catch(error => {
      dispatch({type: 'error'})
    })
  }
}
