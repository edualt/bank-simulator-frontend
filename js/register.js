const form = document.getElementById('form');
var id;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const view = document.getElementById('view');
    const rfc = document.getElementById('rfc').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const cuenta_select = document.getElementById('cuenta_select');
    const nip = document.getElementById('nip').value;
    const tipo_cuenta = cuenta_select.options[cuenta_select.selectedIndex].value;

    console.log(rfc, first_name, last_name, nip, tipo_cuenta);

    register(rfc, first_name, last_name, nip, tipo_cuenta, view);

    async function register(rfc, first_name, last_name, nip, tipo_cuenta){
        if (rfc.length != 0 || first_name.length != 0 || last_name.length != 0 || tipo_cuenta != '') {
            await fetch('http://127.0.0.1:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rfc: rfc,
                    first_name: first_name,
                    last_name: last_name,
                    nip: nip,
                    tipo_cuenta: tipo_cuenta
                })
    
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                }
                )
    
            await fetch('http://127.0.0.1:4000/api/users/rfc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rfc: rfc
                })
            })
                .then(res => res.json())
                .then(json => {
    
                    console.log(json)
    
                    id = json[0].id;
                    console.log(id)
    
                    if (tipo_cuenta == 'Personal') {
                        fetch(`http://127.0.0.1:4000/api/users/personal/${id}`)
                            .then(res => res.json())
                            .then(json => {
                                console.log(json)
                                
                                //clear view div
                                view.innerHTML = '';
                                view.innerHTML += `<h1>Gracias por registrarte ${json[0].first_name}</h1>`;
                                view.innerHTML += `<p>Tu cuenta personal es: ${json[0].c_personal}</p>`;
                                view.innerHTML += `<p>Tu saldo es: ${json[0].saldo}</p>`;
                                view.innerHTML += `<p>Tu nip es: ${json[0].nip}</p>`;
                                view.innerHTML += `Redireccionando a la pagina de inicio de sesion...`;
                                view.innerHTML += `<div class="pt-2 progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                              </div>`
                                //redirect to login page after 10 seconds
                                setTimeout(() => {
                                    window.location.href = './index.html';
                                }
                                , 10000);

                            })
            
                    }
                    else if (tipo_cuenta == 'Empresarial') {
                        fetch(`http://127.0.0.1:4000/api/users/empresarial/${id}`)
                            .then(res => res.json())
                            .then(json => {
                                console.log(json)
                                
                                //clear view div
                                view.innerHTML = '';
                                view.innerHTML += `<h1>Gracias por registrarte ${json[0].first_name}</h1>`;
                                view.innerHTML += `<p>Tu cuenta empresarial es: ${json[0].c_empresarial}</p>`;
                                view.innerHTML += `<p>Tu saldo es: ${json[0].saldo}</p>`;
                                view.innerHTML += `<p>Tu nip es: ${json[0].nip}</p>`;
                                view.innerHTML += `Redireccionando a la pagina de inicio de sesion...`;
                                view.innerHTML += `<div class="pt-2 progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                              </div>`
                                //redirect to login page after 10 seconds
                                setTimeout(() => {
                                    window.location.href = './index.html';
                                }
                                , 10000);

                            })
                    }
    
                })
    
    
            
        }
    }

});