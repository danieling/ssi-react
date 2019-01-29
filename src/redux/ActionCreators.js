import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../shared/baseUrl";

// action creator
export const addComment = (itemId, rating, author, comment) => (
    {
        type: ActionTypes.ADD_COMMENT,
        payload: {
            itemId: itemId,
            rating: rating,
            author: author,
            comment: comment
        }
    }
);

export const postComment = (itemId, rating, author, comment) => (dispatch) => {

    const newComment = {
        itemId: itemId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments',
        {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

// es un thunk
// aqui va la logica de negocio para modificar el state
// el thunk puede despachar varias acciones
export const fetchItems = () => (dispatch) => {
    dispatch(itemsLoading(true));
    //poner items en el store
    return fetch(baseUrl + 'items')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(items => dispatch(addItems(items)))
        .catch(error => dispatch(itemsFailed(error.message)));
};

// action creator
export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

// action creator
export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});

// action creator
export const addItems = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
