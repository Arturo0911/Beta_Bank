const Random = {};

Random.RandomNumber = () => {
    const name = 'abcedfghijklmnoperstuvwxyz0123456789'
    let Randnum = 0;
    for (let i = 0; i < 9; i++) {
        Randnum += name.charAt(Math.floor(Math.random() * name.length));
    }
    return Randnum;
};


module.exports = Random;