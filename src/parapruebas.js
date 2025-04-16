
function getCookie(name) {
    let cookie = 'other=other';
    const value = `; ${cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }else{
        return null;
    }
        
  }

let nameV = "player_id"
let value = getCookie(nameV);
console.log(value);