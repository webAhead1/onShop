function register(data, database){
    if (data.pass !== data.confirmpass){
        alert("Passwords do not match");
        return;
    }

}

module.exports = {register};