console.log('*****');

const baseUrl = 'https://jsonbox.io/';
const boxId = 'box_63a9b967cb6bd678ee3b';
const todoListEndpoint = `${baseUrl}${boxId}`;

// send get request to URL
const getData = async () => {
    try {
        const response = await fetch(`${todoListEndpoint}`, { method: 'GET' }); // method: "GET" not required
        return await response.json(); // return result as array with json data
    } catch (error) {
        console.log('Oops something went wrong', error);
    }

};

// post request with new date to URL endpoint
const postItem = async data => {
    // fetch result from POST
    const response = await fetch(`${todoListEndpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// // get single task
// const getSingleItem = async id => {
// const url = `${todoListEndpoint}/${id}`;
// console.log('get request was done', url);
//     const response = await fetch(url);
//     return await response.json();
// };

// update (PUT) single task by id
const putSingleItem = async (id, description, done) => {
    const url = `${todoListEndpoint}/${id}`;
    console.log('put request was done', url);
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ description, done }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// delete request for single todoItem
const deleteSingleItem = async id => {
    const url = `${todoListEndpoint}/${id}`;
    console.log('delete request was done', url);
    const response = await fetch(url, { method: 'DELETE'});
    return await response.json();
};