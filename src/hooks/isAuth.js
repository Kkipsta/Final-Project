
export const checkIfUserExists = (history,destination) => {
    const isLogedIn = localStorage.getItem("isLogedIn");

    if (isLogedIn && JSON.parse(isLogedIn) === true) {
      history.push("/");
    } else {
      history.push(destination);
    }
}

