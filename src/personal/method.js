const Name_generator = {};


Name_generator.create_name = () => {
    let name = 'abcdefghijlmnopqrstuvwxyz0123456789$%&#';
    let num = 0;
    for (let i = 0; i < 20; i++) {
        num += name.charAt(Math.floor(Math.random() * name.length));
    }
    return num;
};


module.exports = Name_generator