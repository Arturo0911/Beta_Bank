$(document).ready(function() {

    const overlay = document.getElementById('overlay');
    const overlay_hidden = document.getElementById('overlay_hidden');
    const select = document.getElementById('select_operation');
    const Close_overlay = document.getElementById('Close_overlay');

    const selector = document.getElementById('inputAccount');
    const button = document.querySelector('.toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebar_container = document.getElementById('container-bf-sidebar');

    const select_city = document.getElementById('inputCity');

    button.addEventListener('click', function(e) {

        sidebar.classList.toggle('active');
        sidebar_container.classList.toggle('active');
        e.preventDefault();
    });


    const object_provincias = {
        'Azuay': [
            'Chordeleg', 'Cuenca', 'El Pan', 'Girón', 'Guachapala', 'Gualaceo', 'Nabón', 'Oña', 'Paute', 'Ponce Enriquez', 'Pucará', 'San Fernando',
            'Santa Isabel', 'Sevilla de Oro', 'Sígsig'
        ],
        'Guayas': [
            'Alfredo Baquerizo Moreno', 'Balao', 'Balzar', 'Colimes', 'Coronel Marcelino y Maridueña', 'Daule', 'El Empalme', 'El Triunfo', 'Durán',
            'General Antonio Elizalde', 'Playas', 'Guayaquil', 'Isidro Ayora', 'Lomas de Sargentillo', 'Milagro', 'Naranjal', 'Naranjito', 'Nobol',
            'Palestina', 'Pedro Carbo', 'Salitre', 'Samborondón', 'Santa Lucía', 'Simón Bolivar', 'Yaguachi'
        ]
    };




    select_city.addEventListener('change', () => {
        const provincias = $('#inputCity').val();
        console.log('lo seleccionado: ', $('#inputCity').val());
        console.log('object_provincias', object_provincias);
        console.log('provincias: ', provincias);

        if (provincias === 'Guayas') {
            function Fetch_provinces() {
                let inner = '';
                object_provincias.Guayas.forEach(element => {
                    inner += `<option> ${element}</option>`;
                });
                $('#inputState').html(inner);
            }
            Fetch_provinces();
        } else if (provincias === 'Azuay') {
            function Fetch_provinces() {
                let inner = '';
                object_provincias.Azuay.forEach(element => {
                    inner += `<option> ${element}</option>`;
                });
                $('#inputState').html(inner);
            }
            Fetch_provinces();
        }

        //Fetch_provinces();
    });
});